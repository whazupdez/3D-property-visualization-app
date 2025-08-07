'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Star, Send, QrCode, MessageSquare, Calendar, CheckCircle, AlertCircle, User, Award } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { PropertyData, ContactFormData } from '@/types/property';

interface ContactSectionProps {
  data: PropertyData['contact'];
}

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  inquiryType: z.enum(['general', 'viewing', 'pricing', 'availability']),
  preferredContact: z.enum(['email', 'phone', 'both']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredTime: z.string().optional(),
});

type FormData = z.infer<typeof contactFormSchema>;

export default function ContactSection({ data }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedAgent, setSelectedAgent] = useState(data.agents[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      inquiryType: 'general',
      preferredContact: 'email',
    }
  });

  const inquiryType = watch('inquiryType');

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would send the data to your backend
      console.log('Form submitted:', { ...formData, agentId: selectedAgent.id });
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypeOptions = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare },
    { value: 'viewing', label: 'Schedule Viewing', icon: Calendar },
    { value: 'pricing', label: 'Pricing Information', icon: Star },
    { value: 'availability', label: 'Availability', icon: CheckCircle },
  ];

  const preferredContactOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'both', label: 'Both' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-black text-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/70 backdrop-blur-sm border-b border-white/20">
        <div className="p-tv-safe">
          <div className="text-center">
            <h2 className="text-tv-h1 font-bold mb-2">Get In Touch</h2>
            <p className="text-tv-body text-gray-300">Ready to make this property your home? Contact our expert team</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 h-full flex">
        {/* Contact Form (60%) */}
        <div className="w-3/5 h-full p-tv-safe">
          <div className="h-full bg-white/10 backdrop-blur-sm rounded-xl p-6 overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-tv-h2 font-bold flex items-center">
                  <User className="mr-3 text-emerald-400" size={24} />
                  Your Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Inquiry Details */}
              <div className="space-y-4">
                <h3 className="text-tv-h2 font-bold flex items-center">
                  <MessageSquare className="mr-3 text-emerald-400" size={24} />
                  Inquiry Details
                </h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Type of Inquiry *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {inquiryTypeOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            {...register('inquiryType')}
                            type="radio"
                            value={option.value}
                            className="sr-only"
                          />
                          <div className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                            inquiryType === option.value
                              ? 'border-emerald-400 bg-emerald-400/20'
                              : 'border-white/30 bg-white/10 hover:bg-white/20'
                          }`}>
                            <IconComponent size={20} className="text-emerald-400" />
                            <span className="font-semibold">{option.label}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Preferred Contact Method *</label>
                    <select
                      {...register('preferredContact')}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    >
                      {preferredContactOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-gray-800">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Preferred Contact Time</label>
                    <input
                      {...register('preferredTime')}
                      type="text"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      placeholder="e.g., Weekdays 9-5 PM"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
                
                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center space-x-2"
                  >
                    <CheckCircle size={20} className="text-green-400" />
                    <span className="text-green-400 font-semibold">Message sent successfully! We'll get back to you soon.</span>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center space-x-2"
                  >
                    <AlertCircle size={20} className="text-red-400" />
                    <span className="text-red-400 font-semibold">Failed to send message. Please try again.</span>
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Contact Information & Agents (40%) */}
        <div className="w-2/5 h-full bg-black/50 backdrop-blur-sm border-l border-white/20 p-tv-safe">
          <div className="space-y-6 h-full overflow-y-auto">
            {/* Office Information */}
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-tv-h2 font-bold mb-4 flex items-center">
                <MapPin className="mr-3 text-emerald-400" size={24} />
                Office Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-300">{data.office.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone size={20} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-300">{data.office.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail size={20} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">{data.office.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock size={20} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <div className="text-gray-300 space-y-1">
                      {data.office.hours.map((hour, index) => (
                        <p key={index}>{hour}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Agents */}
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-tv-h2 font-bold mb-4 flex items-center">
                <User className="mr-3 text-emerald-400" size={24} />
                Property Agents
              </h3>
              
              <div className="space-y-4">
                {data.agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAgent.id === agent.id
                        ? 'border-emerald-400 bg-emerald-400/20'
                        : 'border-white/30 bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-600 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={agent.photo}
                          alt={agent.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder-agent.jpg';
                          }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{agent.name}</h4>
                        <p className="text-emerald-400 font-semibold">{agent.title}</p>
                        
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Phone size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-300">{agent.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-300">{agent.email}</span>
                          </div>
                        </div>
                        
                        {/* Agent Stats */}
                        <div className="mt-3 flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star size={14} className="text-yellow-400" />
                            <span className="text-sm font-semibold">{agent.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award size={14} className="text-blue-400" />
                            <span className="text-sm">{agent.experience}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-tv-h2 font-bold mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <Calendar size={20} />
                  <span>Schedule Viewing</span>
                </button>
                
                <button className="w-full bg-purple-500 hover:bg-purple-600 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <Phone size={20} />
                  <span>Call Now</span>
                </button>
                
                <button className="w-full bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <MessageSquare size={20} />
                  <span>Live Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}