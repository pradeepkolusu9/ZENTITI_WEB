import React, { useState } from 'react';
import { Briefcase, Linkedin, Globe, Clock } from 'lucide-react';

export const ExperienceStep = ({ data, onChange, onValidation }) => {
  const [errors, setErrors] = useState({});

  const validate = (fieldData) => {
    const newErrors = {};
    
    if (!fieldData.currentRole?.trim()) {
      newErrors.currentRole = 'Current role is required';
    }
    
    if (!fieldData.company?.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!fieldData.experience) {
      newErrors.experience = 'Years of experience is required';
    } else if (fieldData.experience < 0 || fieldData.experience > 50) {
      newErrors.experience = 'Please enter valid years of experience';
    }
    
    if (fieldData.linkedin && !/^(https?:\/\/)?(www\.)?linkedin\.com\/.*/.test(fieldData.linkedin)) {
      newErrors.linkedin = 'Please enter a valid LinkedIn URL';
    }
    
    if (fieldData.portfolio && !/^(https?:\/\/)?(www\.)?.*/.test(fieldData.portfolio)) {
      newErrors.portfolio = 'Please enter a valid portfolio URL';
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidation(isValid);
    return isValid;
  };

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    onChange(newData);
    validate(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Professional Experience
        </h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Tell us about your professional background and experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Current Role *
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={data.currentRole || ''}
              onChange={(e) => handleChange('currentRole', e.target.value)}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
                errors.currentRole ? 'border-red-500' : 'border-[var(--border-default)]'
              }`}
              style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
              placeholder="Senior Integration Engineer"
            />
          </div>
          {errors.currentRole && (
            <p className="text-red-500 text-xs mt-1">{errors.currentRole}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Company *
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={data.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
                errors.company ? 'border-red-500' : 'border-[var(--border-default)]'
              }`}
              style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
              placeholder="Tech Corp Inc."
            />
          </div>
          {errors.company && (
            <p className="text-red-500 text-xs mt-1">{errors.company}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Years of Experience *
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="number"
            min="0"
            max="50"
            value={data.experience || ''}
            onChange={(e) => handleChange('experience', parseInt(e.target.value) || '')}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
              errors.experience ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="5"
          />
        </div>
        {errors.experience && (
          <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          LinkedIn Profile
        </label>
        <div className="relative">
          <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="url"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
              errors.linkedin ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        {errors.linkedin && (
          <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Portfolio/Website
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="url"
            value={data.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
              errors.portfolio ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="https://johndoe.dev"
          />
        </div>
        {errors.portfolio && (
          <p className="text-red-500 text-xs mt-1">{errors.portfolio}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Skills & Expertise
        </label>
        <textarea
          value={data.skills || ''}
          onChange={(e) => handleChange('skills', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-[var(--border-default)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)]"
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
          placeholder="MuleSoft, API Management, Java, Python, Cloud Integration, etc."
        />
        <p className="text-[var(--text-muted)] text-xs mt-1">
          Separate multiple skills with commas
        </p>
      </div>
    </div>
  );
};
