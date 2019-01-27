const jwt  = require('jsonwebtoken');

module.exports = {
    sign: (_payload, _options) => {
        /*
        [Payload : Claims]
        Reserved claims : 이미 예약된 Claim. 필수는 아니지만 사용하길 권장. key 는 모두 3자리 String이다.
        - iss: 토큰 발급자 (issuer)
        - sub: 토큰 제목 (subject)
        - aud: 토큰 대상자 (audience)
        - exp: 토큰의 만료시간 (expiraton), 시간은 NumericDate 형식으로 되어있어야 하며 (예: 1480849147370) 언제나 현재 시간보다 이후로 설정되어있어야합니다.
        - nbf: Not Before 를 의미하며, 토큰의 활성 날짜와 비슷한 개념입니다. 여기에도 NumericDate 형식으로 날짜를 지정하며, 이 날짜가 지나기 전까지는 토큰이 처리되지 않습니다.
        - iat: 토큰이 발급된 시간 (issued at), 이 값을 사용하여 토큰의 age 가 얼마나 되었는지 판단 할 수 있습니다.
        - jti: JWT의 고유 식별자로서, 주로 중복적인 처리를 방지하기 위하여 사용됩니다. 일회용 토큰에 사용하면 유용합니다.


        Public claims : 사용자 정의 Claim.
        Public 이라는 이름처럼 공개용 정보
        충돌 방지를 위해 URI 포맷을 이용해 저장한다.


        [Signature]
        Header와 Payload의 데이터 무결성과 변조 방지를 위한 서명
        Header + Payload 를 합친 후, Secret 키와 함께 Header의 해싱 알고리즘으로 인코딩

        대략 18 = 1초
        */

        if (!_payload) {
            console.log("payload 값은 필수입니다.");
            return false;
        }

        const options = {
            'issuer':  'peoplefund',
            'algorithm':  'RS256',
            'expiresIn': '10d'
        };

        Object.assign(options, {}, _options);

        jwt.sign(_payload, process.env.AUTH_PRIVATE_KEY, options, (err, token) => {
            console.log(token);
            console.log(err);
            console.log('jwt published success');
        });
    },
    verify: (_token, _options) => {

        var options = {
            issuer:  _options.issuer,
            subject:  _options.subject,
            audience:  _options.audience,
            expiresIn:  '30d',
            algorithm:  ['RS256']
        };

        try {
            return jwt.verify(_token, process.env.AUTH_PUBLIC_KEY, _options);
        } catch (err) {
            return false;
        }
    },
    decode: (_token) => {
        return jwt.decode(_token, {complete: true});
        //returns null if token is invalid
    }
}
