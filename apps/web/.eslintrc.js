module.exports = {
  extends: ["next", "next/core-web-vitals"],
  parserOptions: {
    project: true,
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
