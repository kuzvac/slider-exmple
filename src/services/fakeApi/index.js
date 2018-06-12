/**
 * Mocking client-server processing
 */
import { authSuccess} from './testData'

const TIMEOUT = 500;

export default {
  getData: () => {
    return new Promise( (resolve, reject) => {
      setTimeout(() => resolve(authSuccess), TIMEOUT)
    })
  }
}
