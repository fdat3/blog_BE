export interface FacebookInterface {
  token: string
}

export interface FacebookResponseInterface {
  id: string
  email: string
  picture: string
}

export interface GoogleInterface {
  token: string
}

export interface GoogleResponseInterface {
  email: string
  picture: string
  name?: string
}

export interface AppleInterface {
  token: string
}

export interface AppleResponseToken {}

export interface KakaoInterface {
  token: string
}

export interface NaverInterface {
  token: string
}
