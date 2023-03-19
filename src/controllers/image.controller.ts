import { NextFunction, Request, Response, Router } from 'express'
import probe from 'probe-image-size'
import Controller from '@/interfaces/controller.interface'
// import HttpException from '@/utils/exceptions/http.exceptions'
import ConstantAPI from '@/constants/api.constant'
// import ConstantMessage from '@/constants/message.constant'
// import ConstantHttpCode from '@/constants/http.code.constant'
// import ConstantHttpReason from '@/constants/http.reason.constant'
import logger from '@/utils/logger.util'
import multer from 'multer'
import Path from '@/constants/path.constant'
import AWS from 'aws-sdk'
import Variable from '@/env/variable.env'
import HttpException from '@/utils/exceptions/http.exceptions'
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
import ConstantMessage from '@/constants/message.constant'

import Jimp from 'jimp'
import imagemin from 'imagemin'
import imageminGifsicle from 'imagemin-gifsicle'

const TYPE_IMAGE_PNG = '.png'
const TYPE_IMAGE_GIF = '.gif'
const FILE_IMAGE_PATH = Path.FILE_IMAGE_DESTINATION
const AWS_BUCKET_NAME: string = Variable.AWS_BUCKET_NAME
const AWS_BUCKET_REGION: string = Variable.AWS_BUCKET_REGION
const AWS_ACCESS_KEY_ID: string = Variable.AWS_ACCESS_KEY_ID
const AWS_ACCESS_SECRET_KEY: string = Variable.AWS_ACCESS_SECRET_KEY

AWS.config.update({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_ACCESS_SECRET_KEY,
})

const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
})

const bucketParams = {
  Bucket: AWS_BUCKET_NAME,
}

const bucketConfig = {
  AllowedHeaders: ['Authorization'],
  AllowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  AllowedOrigins: ['*'],
  ExposeHeaders: [],
  MaxAgeSeconds: 3000,
}

const corsRule = new Array(bucketConfig)
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, Path.FILE_IMAGE_DESTINATION)
  },
  filename: function (req: Request, file: any, cb: any) {
    const getTypeImage = file.mimetype.split('/')[1]
    if (
      file.originalname.includes('xlsx') ||
      file.originalname.includes('xls')
    ) {
      const newName = file.originalname.replace(/ /g, '')
      cb(null, newName)
    } else {
      const id = CryptoJS.lib.WordArray.random(16)

      if (getTypeImage === 'gif') {
        cb(null, file.fieldname + '-' + Date.now() + '_' + id + TYPE_IMAGE_GIF)
      } else {
        cb(null, file.fieldname + '-' + Date.now() + '_' + id + TYPE_IMAGE_PNG)
      }
    }
  },
})

const upload = multer({ storage: storage })

class ImageController implements Controller {
  public path: string
  public router: Router

  constructor() {
    this.path = `${ConstantAPI.IMAGE}`
    this.router = Router()
    this.initialiseRoutes()

    // S3
    S3.getBucketCors(bucketParams, (err, data): void => {
      if (err) {
        logger.error('Cannot get bucket CORS Rules')
        logger.error(err)
      } else if (data) {
        console.log('Success', JSON.stringify(data.CORSRules))
      }
    })

    S3.putBucketCors(
      {
        ...bucketParams,
        CORSConfiguration: {
          CORSRules: corsRule,
        },
      },
      (error, data): void => {
        if (error) {
          logger.error('Cannot put bucket CORS Rules')
          logger.error(error)
        } else if (data) {
          console.log('Success', data)
        }
      },
    )
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${ConstantAPI.IMAGE_UPLOAD}`,
      upload.single('image'),
      this.uploadImage,
    )
    this.router.post(
      `${this.path}${ConstantAPI.IMAGE_UPLOAD_RESIZE}`,
      upload.single('image'),
      this.uploadImage,
    )
    this.router.post(
      `${this.path}${ConstantAPI.IMAGE_UPLOAD_MULTIPLE}`,
      upload.array('image', 10),
      this.uploadImage,
    )
    this.router.post(
      `${this.path}${ConstantAPI.IMAGE_UPLOAD_MULTIPLE_RESIZE}`,
      upload.array('image', 10),
      this.uploadImage,
    )
  }

  private resizeGif(originalFilePath: any): Promise<any> {
    return new Promise((resolve, reject): void => {
      // const output = 'images/resized-' + filename
      try {
        imagemin([originalFilePath], {
          destination: 'images/',
          plugins: [imageminGifsicle()],
        })
        resolve('success')
      } catch (err) {
        logger.error(err)
        reject(err)
      }
    })
  }

  private resizeImage(
    originalFilePath: string,
    newFilePath: string,
    maxSize: number,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const input = require('fs').createReadStream(originalFilePath)
      probe(input).then((result: any) => {
        let newWidth = maxSize
        let newHeight = maxSize
        if (result.width > result.height) {
          if (result.width < newWidth) {
            newWidth = result.width
          }
          newHeight = Math.round((newWidth * result.height) / result.width)
        } else {
          if (result.height < newHeight) {
            newHeight = result.width
          }
          newWidth = Math.round((newHeight * result.width) / result.height)
        }

        Jimp.read(originalFilePath)
          .then((image: Jimp): void => {
            image.resize(newWidth, newHeight).write(newFilePath)
          })
          .catch((error): void => {
            logger.error(error)
            reject(error)
          })

        input.destroy()
        resolve('completed')
      })
    })
  }

  private async uploadImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { file } = req

    if (!file) {
      return next(
        new HttpException(
          ConstantHttpCode.BAD_REQUEST,
          ConstantHttpReason.BAD_REQUEST,
          ConstantMessage.UPLOAD_FILE,
        ),
      )
    }

    const getTypeImage = file.mimetype.split('/')[1]
    const path = file.path
    let fileName = 'resized-' + file.filename
    if (file.originalname == 'true') {
      fileName += `-${Date.now()}`
    }
    const size = req.params.size ? parseInt(req.params.size) : 400

    if (getTypeImage === 'gif') {
      await this.resizeGif(path)
    } else {
      await this.resizeImage(file.path, FILE_IMAGE_PATH + fileName, size)
    }
  }
}

export default ImageController
