import InstanceFirebase from '@/firebase/instance.firebase'

class ServiceFirebase extends InstanceFirebase {
  constructor() {
    super()
  }

  sendSingleDevice() {

  }

}
const firebaseService = new ServiceFirebase()
export default firebaseService