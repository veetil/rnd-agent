import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturesPlanet() {
  const [tab, setTab] = useState<number>(1);

  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Explore our platform features</h1>
            <p className="text-xl text-gray-600">
              Our enterprise-grade orchestration layer provides the tools you need to build,
              deploy, and manage AI agent systems with unmatched flexibility and control.
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Powerful orchestration for AI agents</h3>
                <p className="text-xl text-gray-600">
                  Our platform provides the tools and infrastructure you need to build
                  sophisticated AI agent systems that can handle complex tasks and workflows.
                </p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <button
                  className={`text-left flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 1
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Model Portability
                    </div>
                    <div className="text-gray-600">
                      Switch between LLM providers without changing your application code
                    </div>
                  </div>
                </button>
                <button
                  className={`text-left flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Orchestration Excellence
                    </div>
                    <div className="text-gray-600">
                      Coordinate complex workflows between multiple AI agents
                    </div>
                  </div>
                </button>
                <button
                  className={`text-left flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 3
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Memory Persistence
                    </div>
                    <div className="text-gray-600">
                      Enable long-term memory for your AI agents
                    </div>
                  </div>
                </button>
                <button
                  className={`text-left flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out ${
                    tab !== 4
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(4);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Operational Reliability
                    </div>
                    <div className="text-gray-600">
                      Enterprise-grade monitoring, logging, and reliability features
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="relative flex flex-col text-center lg:text-right">
                {/* Item 1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: tab === 1 ? 1 : 0,
                    scale: tab === 1 ? 1 : 0.95,
                    x: tab === 1 ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ display: tab === 1 ? "block" : "none" }}
                  className="relative"
                >
                  <div className="w-full h-auto rounded-lg shadow-lg bg-white overflow-hidden">
                    <div className="relative h-64 bg-primary-100 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-primary-600 bg-opacity-10 flex items-center justify-center">
                        <svg className="w-24 h-24 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">Model Portability</h4>
                      <p className="text-gray-600">
                        Switch between different LLM providers without changing your application code. Our abstraction layer ensures your AI systems remain flexible and future-proof.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Item 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: tab === 2 ? 1 : 0,
                    scale: tab === 2 ? 1 : 0.95,
                    x: tab === 2 ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ display: tab === 2 ? "block" : "none" }}
                  className="relative"
                >
                  <div className="w-full h-auto rounded-lg shadow-lg bg-white overflow-hidden">
                    <div className="relative h-64 bg-secondary-100 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-secondary-600 bg-opacity-10 flex items-center justify-center">
                        <svg className="w-24 h-24 text-secondary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">Orchestration Excellence</h4>
                      <p className="text-gray-600">
                        Coordinate complex workflows between multiple AI agents. Our orchestration layer manages communication, task delegation, and process flow for sophisticated AI systems.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Item 3 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: tab === 3 ? 1 : 0,
                    scale: tab === 3 ? 1 : 0.95,
                    x: tab === 3 ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ display: tab === 3 ? "block" : "none" }}
                  className="relative"
                >
                  <div className="w-full h-auto rounded-lg shadow-lg bg-white overflow-hidden">
                    <div className="relative h-64 bg-primary-100 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-primary-600 bg-opacity-10 flex items-center justify-center">
                        <svg className="w-24 h-24 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">Memory Persistence</h4>
                      <p className="text-gray-600">
                        Enable long-term memory for your AI agents. Our memory persistence layer allows agents to maintain context and learn from past interactions, creating more intelligent and personalized experiences.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Item 4 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: tab === 4 ? 1 : 0,
                    scale: tab === 4 ? 1 : 0.95,
                    x: tab === 4 ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ display: tab === 4 ? "block" : "none" }}
                  className="relative"
                >
                  <div className="w-full h-auto rounded-lg shadow-lg bg-white overflow-hidden">
                    <div className="relative h-64 bg-secondary-100 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-secondary-600 bg-opacity-10 flex items-center justify-center">
                        <svg className="w-24 h-24 text-secondary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">Operational Reliability</h4>
                      <p className="text-gray-600">
                        Enterprise-grade monitoring, logging, and reliability features. Our platform provides the tools you need to ensure your AI systems operate reliably at scale, with comprehensive observability and control.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}