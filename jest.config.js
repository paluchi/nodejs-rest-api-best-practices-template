module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  testPathIgnorePatterns: [".d.ts", ".js"],
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/", , "/dist/"],
};
