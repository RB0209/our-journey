"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import timelineData from "../data/timelineData";

export default function Timeline() {
  const [activeYear, setActiveYear] = useState(2011); // Default year
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const yearList = timelineData.map((item) => item.year);

  const activeProjects =
    timelineData.find((item) => item.year === activeYear)?.projects || [];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4">
      {/* Year Selector */}
      <div className="flex md:flex-col overflow-x-auto md:overflow-visible md:w-1/5 gap-2 md:gap-4 mb-4 md:mb-0">
        {yearList.map((year) => (
          <motion.button
            key={year}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setActiveYear(year);
              setExpandedIndex(null);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeYear === year
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {year}
          </motion.button>
        ))}
      </div>

      {/* Projects Display */}
      <div className="flex-1 md:pl-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeProjects.map((project, index) => (
              <motion.div
                key={index}
                className="mb-6 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.01 }}
                onClick={() => toggleExpand(index)}
              >
                {/* Image */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(project.image);
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover"
                  />
                </div>

                {/* Title */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                </div>

                {/* Expandable Description */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 text-gray-600 text-sm"
                    >
                      {project.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!lightboxImage}
        onRequestClose={() => setLightboxImage(null)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
        overlayClassName=""
      >
        <img
          src={lightboxImage}
          alt="Expanded"
          className="max-w-full max-h-full rounded-lg"
        />
      </Modal>
    </div>
  );
}
