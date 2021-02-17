module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/shop",
        permanent: true,
      },
    ];
  },
};
