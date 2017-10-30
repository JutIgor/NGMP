import cookie from 'cookie';

const cookieParser = (req, res, next) => {
  const cookies = req.headers.cookie;

  req.parsedCookies = cookies && cookie.parse(cookies);

  next();
};

export default cookieParser;