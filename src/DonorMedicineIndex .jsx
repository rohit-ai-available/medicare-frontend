import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Users, Shield, MapPin, Phone, Mail, Clock, Award, Truck, HandHeart } from 'lucide-react';

const DonorMedicineIndex = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel images data
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Save Lives Through Medicine Donation",
      subtitle: "Your unused medicines can be someone's lifeline"
    },
    {
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Safe & Verified Distribution",
      subtitle: "Ensuring quality medicines reach those in need"
    },
    {
      url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Building Healthier Communities",
      subtitle: "Together we can make healthcare accessible to all"
    }
  ];

  // Auto-scroll carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Services data
  const services = [
    {
      icon: <HandHeart className="w-12 h-12 text-purple-600" />,
      title: "Medicine Donation",
      description: "Donate your unused, unexpired medicines to help those who cannot afford them. Every donation counts."
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Quality Verification",
      description: "All donated medicines undergo strict quality checks to ensure safety and efficacy before distribution."
    },
    {
      icon: <Truck className="w-12 h-12 text-indigo-600" />,
      title: "Free Delivery",
      description: "We provide free doorstep delivery of medicines to patients in need across the region."
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: "Community Support",
      description: "Building a network of donors, volunteers, and beneficiaries to create a sustainable healthcare ecosystem."
    }
  ];

  // Cards data
  const impactCards = [
    {
      number: "50,000+",
      label: "Medicines Donated",
      icon: <Heart className="w-8 h-8 text-purple-500" />
    },
    {
      number: "25,000+",
      label: "Lives Impacted",
      icon: <Users className="w-8 h-8 text-blue-500" />
    },
    {
      number: "500+",
      label: "Active Donors",
      icon: <Award className="w-8 h-8 text-indigo-500" />
    },
    {
      number: "100+",
      label: "Partner Hospitals",
      icon: <Shield className="w-8 h-8 text-purple-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400">
      {/* Carousel Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
                    {image.title}
                  </h1>
                  <p className="text-lg md:text-xl opacity-90">
                    {image.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Our Services Section */}
      <section className="py-16 px-4 bg-white bg-opacity-20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto">
              We provide comprehensive medicine donation services to bridge the gap between surplus and scarcity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-4 flex justify-center group-hover:animate-bounce">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-100 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Cards Section */}
      <section className="py-16 px-4 bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-gray-100">
              Numbers that reflect our commitment to making healthcare accessible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {card.number}
                </h3>
                <p className="text-gray-600 font-medium">
                  {card.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reach Us Section */}
      <section className="py-16 px-4 bg-white bg-opacity-20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Reach Us
            </h2>
            <p className="text-lg text-gray-100">
              Get in touch with us to donate medicines or learn more about our mission
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
              <p className="text-gray-100">+91 98765 43210</p>
              <p className="text-gray-100">+91 87654 32109</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">info@donormedicine.org</p>
              <p className="text-gray-600">support@donormedicine.org</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Hours</h3>
              <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Sat: 9:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-16 px-4 bg-white bg-opacity-15 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Visit Our Location
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Find us at our main office in Ludhiana, Punjab
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 text-white">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">Our Address</h3>
              </div>
              <p className="text-center">
                123 Medical Plaza, Model Town, Ludhiana, Punjab 141002, India
              </p>
            </div>
            
            {/* Google Map Embed */}
            <div className="h-96 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.4!2d75.8573!3d30.9009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345678%3A0x1234567890abcdef!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Donor Medicine Location"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join our mission to make healthcare accessible. Your donation can save lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Donate Medicines
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
              Become a Volunteer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonorMedicineIndex;