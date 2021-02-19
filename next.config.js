module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/",
        permanent: true,
      },
      {
        source: "/confirmed",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
