import React, { useState } from 'react';
import { Target, Calendar, Home, DollarSign } from 'lucide-react';

export const RolePreferencesStep = ({ data, onChange, onValidation }) => {
  const [errors, setErrors] = useState({});

  const roles = [
    { id: 'mulesoft-architect', label: 'MuleSoft Architect', description: 'Design and lead integration solutions' },
    { id: 'integration-engineer', label: 'Integration Engineer', description: 'Build and maintain API integrations' },
    { id: 'ai-specialist', label: 'AI Specialist', description: 'Develop AI-powered integration solutions' },
    { id: 'solution-architect', label: 'Solution Architect', description: 'Enterprise architecture consulting' },
    { id: 'project-manager', label: 'Project Manager', description: 'Lead integration projects' }
  ];

  const availabilityOptions = [
    { id: 'immediate', label: 'Immediately' },
    { id: '2-weeks', label: '2 weeks' },
    { id: '1-month', label: '1 month' },
    { id: '2-months', label: '2 months' },
    { id: '3-months', label: '3+ months' }
  ];

  const workTypeOptions = [
    { id: 'full-time', label: 'Full-time' },
    { id: 'part-time', label: 'Part-time' },
    { id: 'contract', label: 'Contract' },
    { id: 'freelance', label: 'Freelance' }
  ];

  const validate = (fieldData) => {
    const newErrors = {};
    
    if (!fieldData.interestedRoles || fieldData.interestedRoles.length === 0) {
      newErrors.interestedRoles = 'Please select at least one role';
    }
    
    if (!fieldData.availability) {
      newErrors.availability = 'Please select your availability';
    }
    
    if (!fieldData.workType) {
      newErrors.workType = 'Please select work type preference';
    }
    
    if (fieldData.salaryExpectation && (fieldData.salaryExpectation < 0 || fieldData.salaryExpectation > 1000000)) {
      newErrors.salaryExpectation = 'Please enter a valid salary expectation';
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

  const handleRoleToggle = (roleId) => {
    const currentRoles = data.interestedRoles || [];
    const newRoles = currentRoles.includes(roleId)
      ? currentRoles.filter(id => id !== roleId)
      : [...currentRoles, roleId];
    handleChange('interestedRoles', newRoles);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Role Preferences
        </h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Let us know what type of role you're interested in.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
          Interested Roles *
        </label>
        <div className="space-y-3">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => handleRoleToggle(role.id)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                data.interestedRoles?.includes(role.id)
                  ? 'border-[var(--ember)] bg-[rgba(217,76,26,0.05)]'
                  : 'border-[var(--border-default)] hover:border-[var(--border-strong)]'
              }`}
              style={{ background: data.interestedRoles?.includes(role.id) ? 'var(--bg-section-alt)' : 'var(--bg-card)' }}
            >
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={data.interestedRoles?.includes(role.id) || false}
                  onChange={() => handleRoleToggle(role.id)}
                  className="mt-1 mr-3 text-[var(--ember)] focus:ring-[var(--ember)]"
                  style={{ accentColor: 'var(--ember)' }}
                />
                <div className="flex-1">
                  <div className="font-medium text-[var(--text-primary)]">{role.label}</div>
                  <div className="text-sm text-[var(--text-muted)]">{role.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {errors.interestedRoles && (
          <p className="text-red-500 text-xs mt-1">{errors.interestedRoles}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Availability *
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <select
            value={data.availability || ''}
            onChange={(e) => handleChange('availability', e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] appearance-none ${
              errors.availability ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
          >
            <option value="">Select availability</option>
            {availabilityOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors.availability && (
          <p className="text-red-500 text-xs mt-1">{errors.availability}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Work Type Preference *
        </label>
        <div className="relative">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <select
            value={data.workType || ''}
            onChange={(e) => handleChange('workType', e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] appearance-none ${
              errors.workType ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
          >
            <option value="">Select work type</option>
            {workTypeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors.workType && (
          <p className="text-red-500 text-xs mt-1">{errors.workType}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Salary Expectation (Annual USD)
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="number"
            min="0"
            max="1000000"
            step="5000"
            value={data.salaryExpectation || ''}
            onChange={(e) => handleChange('salaryExpectation', parseInt(e.target.value) || '')}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
              errors.salaryExpectation ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="120000"
          />
        </div>
        {errors.salaryExpectation && (
          <p className="text-red-500 text-xs mt-1">{errors.salaryExpectation}</p>
        )}
        <p className="text-[var(--text-muted)] text-xs mt-1">
          Optional - helps us understand your expectations
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Remote Work Preference
        </label>
        <div className="space-y-2">
          {[
            { id: 'fully-remote', label: 'Fully Remote' },
            { id: 'hybrid', label: 'Hybrid (Some office time)' },
            { id: 'onsite', label: 'On-site' },
            { id: 'flexible', label: 'Flexible' }
          ].map((option) => (
            <label key={option.id} className="flex items-center">
              <input
                type="radio"
                name="remotePreference"
                value={option.id}
                checked={data.remotePreference === option.id}
                onChange={(e) => handleChange('remotePreference', e.target.value)}
                className="mr-2 text-[var(--ember)] focus:ring-[var(--ember)]"
                style={{ accentColor: 'var(--ember)' }}
              />
              <span className="text-[var(--text-primary)]">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
