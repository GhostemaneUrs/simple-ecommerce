module.exports = {
  verbose: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    'lottie-react': '<rootDir>/src/mock/MockLottieReact.jsx'
  },
  testEnvironment: 'jest-environment-jsdom'
}
