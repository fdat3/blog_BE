import InstanceFirebase from '@/firebase/instance.firebase'

class ServiceFirebase extends InstanceFirebase {
  constructor() {
    super()
  }

  sendSingleDevice(): void {

  }

}
const firebaseService = new ServiceFirebase()
export default firebaseService