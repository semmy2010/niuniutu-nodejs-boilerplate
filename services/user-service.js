/**
 * @author Semmy
 *
 * @flow
 */
import { Container, Inject, Service } from 'typedi';

@Service
export default class UserService {
    findOneUser() {
        console.log('this is findOneUser');
    }
}
