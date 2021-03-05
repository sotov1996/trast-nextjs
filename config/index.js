const dev = process.env.NODE_ENV !== "production"

export const servers = dev ? "http://localhost:4000" : 'https://desolate-wildwood-83661.herokuapp.com'