import * as JWT from 'jsonwebtoken';
import { InvalidTokenError } from '@slicejs/error';

export class JsonWebToken {
    static SECRET = process.env.JWT_SECRET || '1d62ada3461$a091c38c95c!0388c8a1a2';

    public static encode(payload: any) {
        const token = JWT.sign(payload, JsonWebToken.SECRET, { expiresIn: '300d' });
        return token;
    }

    public static decode(token: string) {
        let body: string | object = '';
        try {
            body = JWT.verify(token, JsonWebToken.SECRET);
        } catch (error) {
            throw new InvalidTokenError(error.message);
        }

        return body;
    }
}
