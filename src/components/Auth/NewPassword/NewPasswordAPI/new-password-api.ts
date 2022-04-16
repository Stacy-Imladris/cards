import {AxiosResponse} from 'axios';
import {ResponseType} from '../../Registration/RegistrationAPI/registration-api';
import {instance} from '../../../../api/instance';

export const newPasswordAPI = {
    changePassword(data: Omit<NewPasswordDataType, 'password2'>) {
        return instance.post<any, AxiosResponse<ResponseType>, Omit<NewPasswordDataType, 'password2'>>('auth/set-new-password', data).then(res => res.data)
    },
}

export type NewPasswordDataType = {
    password: string
    password2: string
    resetPasswordToken: string
}