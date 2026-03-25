import React, { useState } from 'react';
import { MessageSquare, Clock, Upload } from 'lucide-react';

export const AdditionalInfoStep = ({ data, onChange, onValidation }) => {
  const [errors, setErrors] = useState({});

  const validate = (fieldData) => {
    const newErrors = {};
    
    if (!fieldData.whyZentiti?.trim()) {
      newErrors.whyZentiti = 'Please tell us why you want to join Zentiti';
    } else if (fieldData.whyZentiti.trim().length < 50) {
      newErrors.whyZentiti = 'Please provide at least 50 characters';
    }
    
    if (!fieldData.noticePeriod) {
      newErrors.noticePeriod = 'Please select your notice period';
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real implementation, you would upload the file to a server
      // For now, we'll just store the file name
      handleChange('resume', file.name);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Additional Information
        </h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Help us get to know you better and understand your motivations.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Why do you want to join Zentiti? *
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-[var(--text-muted)]" />
          <textarea
            value={data.whyZentiti || ''}
            onChange={(e) => handleChange('whyZentiti', e.target.value)}
            rows={4}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] resize-none ${
              errors.whyZentiti ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="I'm excited about joining Zentiti because..."
          />
        </div>
        {errors.whyZentiti && (
          <p className="text-red-500 text-xs mt-1">{errors.whyZentiti}</p>
        )}
        <p className="text-[var(--text-muted)] text-xs mt-1">
          Minimum 50 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          What makes you a great fit for this role?
        </label>
        <textarea
          value={data.whyGoodFit || ''}
          onChange={(e) => handleChange('whyGoodFit', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-[var(--border-default)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] resize-none"
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
          placeholder="My experience and skills align well with this role because..."
        />
        <p className="text-[var(--text-muted)] text-xs mt-1">
          Optional - tell us about your relevant experience
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Notice Period *
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <select
            value={data.noticePeriod || ''}
            onChange={(e) => handleChange('noticePeriod', e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] appearance-none ${
              errors.noticePeriod ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
          >
            <option value="">Select notice period</option>
            <option value="immediate">Immediate</option>
            <option value="1-week">1 week</option>
            <option value="2-weeks">2 weeks</option>
            <option value="1-month">1 month</option>
            <option value="2-months">2 months</option>
            <option value="3-months">3 months</option>
          </select>
        </div>
        {errors.noticePeriod && (
          <p className="text-red-500 text-xs mt-1">{errors.noticePeriod}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Resume/CV
        </label>
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="flex items-center justify-center w-full px-4 py-3 border border-[var(--border-default)] rounded-lg cursor-pointer hover:border-[var(--border-strong)] transition-colors"
            style={{ background: 'var(--bg-card)' }}
          >
            <Upload className="h-4 w-4 text-[var(--text-muted)] mr-2" />
            <span className="text-[var(--text-primary)]">
              {data.resume || 'Choose file or drag and drop'}
            </span>
          </label>
        </div>
        <p className="text-[var(--text-muted)] text-xs mt-1">
          PDF, DOC, or DOCX (Max 5MB)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Additional Information
        </label>
        <textarea
          value={data.additionalInfo || ''}
          onChange={(e) => handleChange('additionalInfo', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-[var(--border-default)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] resize-none"
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
          placeholder="Anything else you'd like us to know about you?"
        />
        <p className="text-[var(--text-muted)] text-xs mt-1">
          Optional - certifications, achievements, etc.
        </p>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={data.agreeToTerms || false}
            onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
            className="mr-2 text-[var(--ember)] focus:ring-[var(--ember)]"
            style={{ accentColor: 'var(--ember)' }}
          />
          <span className="text-sm text-[var(--text-primary)]">
            I agree to the terms and conditions and privacy policy
          </span>
        </label>
      </div>
    </div>
  );
};
