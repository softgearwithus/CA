import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function ExploreUs() {
  const videos = [
    { id: 1, link: "https://youtu.be/rsVG3S9px5U?si=Os8619PPmWWhbA4L" },
    { id: 2, link: "https://youtu.be/5tKXL0_n8eo?si=dGHILMcyJ8VVpQdq" },
    { id: 3, link: "https://youtu.be/AVLLv3Hcdxc?si=t8AYTbvHY-5WDCOD" },
  ];

  // Function to extract video ID and return thumbnail URL
  const getThumbnail = (link) => {
    const match = link.match(/(?:youtu\.be\/|v=)([^?&]+)/);
    const videoId = match ? match[1] : null;
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : "https://via.placeholder.com/480x360?text=Video";
  };

  return (
    <section className="w-full bg-gradient-to-b from-indigo-50 via-white to-indigo-50 py-20">
      {/* Heading */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Explore Us
        </h2>
        <p className="text-xl md:text-2xl text-indigo-700 font-medium mt-2">
          Watch Our Latest YouTube Videos
        </p>
        <div className="mt-4 w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Video Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {videos.map((video, index) => (
          <motion.a
            key={video.id}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Thumbnail */}
            <img
              src={getThumbnail(video.link)}
              alt="YouTube Thumbnail"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Play className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <a
          href="https://www.youtube.com/@Synopsis24"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
        >
          Visit Our YouTube Channel
        </a>
      </motion.div>
    </section>
  );
}
