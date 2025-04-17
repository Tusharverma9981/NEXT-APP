// pages/resume-builder.js
"use client";
import { useState } from 'react';
import Head from 'next/head';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });
  
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Here you would normally send data to your API that connects with Gemini
      // For demonstration, we'll simulate an API response delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you would integrate with Gemini API
      // For now, we'll create a formatted resume based on the input data
      const generatedResume = generateResume(formData);
      setResume(generatedResume);
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Failed to generate resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to format the resume (in a real implementation, this would be replaced by Gemini API)
  const generateResume = (data) => {
    // This is a placeholder for AI-generated content
    // In a real implementation, you would send the data to Gemini API
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      summary: data.summary,
      experience: formatExperience(data.experience),
      education: formatEducation(data.education),
      skills: data.skills.split(',').map(skill => skill.trim()),
      aiSuggestions: [
        "Consider adding quantifiable achievements to your experience",
        "Your technical skills align well with software development positions",
        "Adding certifications would strengthen your profile"
      ]
    };
  };

  const formatExperience = (experienceText) => {
    // Simple parsing logic - in real app, AI would do better formatting
    return experienceText.split('\n\n').map(exp => {
      const lines = exp.split('\n');
      return {
        title: lines[0] || '',
        company: lines[1] || '',
        period: lines[2] || '',
        description: lines.slice(3).join('\n') || ''
      };
    });
  };

  const formatEducation = (educationText) => {
    // Simple parsing logic - in real app, AI would do better formatting
    return educationText.split('\n\n').map(edu => {
      const lines = edu.split('\n');
      return {
        degree: lines[0] || 'Degree',
        institution: lines[1] || 'Institution',
        year: lines[2] || 'Year',
        details: lines.slice(3).join('\n') || ''
      };
    });
  };

  const downloadPDF = async () => {
    const resumeElement = document.getElementById('resume-content');
    if (!resumeElement) return;
    
    // Set loading state
    setLoading(true);
    
    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Calculate dimensions to fit the image properly on the PDF
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resume.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>AI Resume Builder</title>
        <meta name="description" content="Build your resume with AI assistance" />
        {/* Add these script imports for PDF functionality */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      </Head>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">AI Resume Builder</h1>
        
        {!resume ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="summary">Professional Summary</label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="experience">
                  Work Experience (Each position in format: Title, Company, Date Range, Description)
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="6"
                  placeholder="Software Engineer
Acme Inc.
2018-2022
Led development of web applications using React and Node.js

Junior Developer
Tech Solutions
2016-2018
Assisted in front-end development and bug fixing"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="education">
                  Education (Each entry in format: Degree, Institution, Year)
                </label>
                <textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Bachelor of Science in Computer Science
University of Technology
2016
Dean's List, Software Engineering Club"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="skills">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="JavaScript, React, Node.js, UI/UX Design, Project Management"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Resume Template</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`border rounded-md p-4 cursor-pointer transition-all ${
                      selectedTemplate === 'modern' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedTemplate('modern')}
                  >
                    <h3 className="font-medium mb-2">Modern</h3>
                    <div className="bg-gray-200 h-32 flex flex-col">
                      <div className="h-8 bg-blue-500 mb-2"></div>
                      <div className="flex-1 flex">
                        <div className="w-1/3 bg-blue-100"></div>
                        <div className="w-2/3 p-2">
                          <div className="h-3 w-3/4 bg-gray-400 mb-2"></div>
                          <div className="h-2 w-full bg-gray-300 mb-1"></div>
                          <div className="h-2 w-full bg-gray-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className={`border rounded-md p-4 cursor-pointer transition-all ${
                      selectedTemplate === 'classic' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedTemplate('classic')}
                  >
                    <h3 className="font-medium mb-2">Classic</h3>
                    <div className="bg-gray-200 h-32 flex flex-col">
                      <div className="h-8 bg-gray-500 mb-2 flex items-center justify-center">
                        <div className="h-3 w-1/2 bg-white"></div>
                      </div>
                      <div className="flex-1 p-2">
                        <div className="h-3 w-1/2 bg-gray-400 mb-2"></div>
                        <div className="h-2 w-full bg-gray-300 mb-1"></div>
                        <div className="h-2 w-full bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className={`border rounded-md p-4 cursor-pointer transition-all ${
                      selectedTemplate === 'creative' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedTemplate('creative')}
                  >
                    <h3 className="font-medium mb-2">Creative</h3>
                    <div className="bg-gray-200 h-32 flex">
                      <div className="w-1/3 bg-purple-500"></div>
                      <div className="w-2/3 p-2">
                        <div className="h-3 w-3/4 bg-gray-400 mb-2"></div>
                        <div className="h-2 w-full bg-gray-300 mb-1"></div>
                        <div className="h-2 w-full bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Generating Resume...' : 'Generate AI Resume'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">AI-Generated Resume</h2>
              <div className="flex space-x-3">
                <div className="relative inline-block">
                  <select 
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                  >
                    <option value="modern">Modern Template</option>
                    <option value="classic">Classic Template</option>
                    <option value="creative">Creative Template</option>
                  </select>
                </div>
                <button
                  onClick={() => setResume(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition duration-300"
                >
                  Back to Form
                </button>
              </div>
            </div>
            
            {/* Resume Display */}
            <div id="resume-content" className="border border-gray-300 rounded-md mb-6 bg-white">
              {selectedTemplate === 'modern' && (
                <div className="p-6">
                  <div className="bg-blue-600 text-white p-6 rounded-t-md">
                    <h1 className="text-3xl font-bold">{resume.name}</h1>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <span>{resume.email}</span>
                      <span>{resume.phone}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="md:col-span-1 bg-blue-50 p-4 rounded-md">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-blue-800 mb-3">Skills</h2>
                        <div className="space-y-2">
                          {resume.skills.map((skill, index) => (
                            <div key={index} className="bg-white px-3 py-1 rounded-md text-blue-800">
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-lg font-semibold text-blue-800 mb-3">Education</h2>
                        {resume.education.map((edu, index) => (
                          <div key={index} className="mb-4">
                            <h3 className="font-medium">{edu.degree}</h3>
                            <div className="text-sm">{edu.institution}</div>
                            <div className="text-sm text-blue-800">{edu.year}</div>
                            {edu.details && <p className="text-sm mt-1">{edu.details}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold border-b border-blue-200 pb-2 mb-3">Professional Summary</h2>
                        <p>{resume.summary}</p>
                      </div>
                      
                      <div>
                        <h2 className="text-xl font-semibold border-b border-blue-200 pb-2 mb-3">Work Experience</h2>
                        {resume.experience.map((exp, index) => (
                          <div key={index} className="mb-5">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg">{exp.title}</h3>
                              <span className="text-blue-800 font-medium">{exp.period}</span>
                            </div>
                            <div className="text-gray-700 font-medium">{exp.company}</div>
                            <p className="mt-2">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedTemplate === 'classic' && (
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold uppercase tracking-wide">{resume.name}</h1>
                    <div className="text-gray-600 mt-2">
                      {resume.email} | {resume.phone}
                    </div>
                    <div className="h-px bg-gray-300 w-full my-4"></div>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-serif font-semibold text-center mb-3">Professional Summary</h2>
                    <p className="text-center">{resume.summary}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-serif font-semibold border-b border-gray-300 pb-2 mb-4">Work Experience</h2>
                    {resume.experience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{exp.title}</h3>
                          <span className="text-gray-600">{exp.period}</span>
                        </div>
                        <div className="text-gray-700 italic">{exp.company}</div>
                        <p className="mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-serif font-semibold border-b border-gray-300 pb-2 mb-4">Education</h2>
                    {resume.education.map((edu, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <span className="text-gray-600">{edu.year}</span>
                        </div>
                        <div className="text-gray-700 italic">{edu.institution}</div>
                        {edu.details && <p className="mt-1">{edu.details}</p>}
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-serif font-semibold border-b border-gray-300 pb-2 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {resume.skills.map((skill, index) => (
                        <span key={index} className="text-gray-800">• {skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedTemplate === 'creative' && (
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-purple-700 text-white p-6">
                    <div className="mb-8 mt-4">
                      <h1 className="text-2xl font-bold mb-1">{resume.name}</h1>
                      <div className="text-sm opacity-90 space-y-1">
                        <div>{resume.email}</div>
                        <div>{resume.phone}</div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-3 border-b border-purple-500 pb-1">Skills</h2>
                      <div className="space-y-2">
                        {resume.skills.map((skill, index) => (
                          <div key={index} className="bg-purple-600 px-3 py-1 rounded text-sm">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3 border-b border-purple-500 pb-1">Education</h2>
                      {resume.education.map((edu, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="font-medium">{edu.degree}</h3>
                          <div className="text-sm opacity-90">{edu.institution}</div>
                          <div className="text-sm opacity-80">{edu.year}</div>
                          {edu.details && <p className="text-sm mt-1 opacity-80">{edu.details}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-8">
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-purple-700 mb-3">Professional Summary</h2>
                      <p className="text-gray-800">{resume.summary}</p>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold text-purple-700 mb-4">Work Experience</h2>
                      {resume.experience.map((exp, index) => (
                        <div key={index} className="mb-6">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg">{exp.title}</h3>
                            <span className="text-purple-700 text-sm font-medium bg-purple-50 px-2 py-1 rounded">
                              {exp.period}
                            </span>
                          </div>
                          <div className="text-gray-700 font-medium">{exp.company}</div>
                          <p className="mt-2 text-gray-600">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* AI Suggestions Section */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
              <h3 className="font-semibold text-blue-700 mb-2">AI Suggestions</h3>
              <ul className="list-disc pl-5 text-blue-800">
                {resume.aiSuggestions.map((suggestion, index) => (
                  <li key={index} className="mb-1">{suggestion}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 text-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                onClick={downloadPDF}
                disabled={loading}
              >
                {loading ? 'Preparing PDF...' : 'Download PDF Resume'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}