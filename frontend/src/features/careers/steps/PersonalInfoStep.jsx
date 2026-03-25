import React, { useState } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

// Individual field steps
export const FirstNameStep = ({ data, onChange, onValidation }) => {
  const [error, setError] = useState('');

  const validate = (value) => {
    if (!value?.trim()) {
      setError('First name is required');
      onValidation(false);
      return false;
    }
    setError('');
    onValidation(true);
    return true;
  };

  const handleChange = (value) => {
    onChange('firstName', value);
    validate(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          First Name
        </h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Let's start with your first name.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          First Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={data.firstName || ''}
            onChange={(e) => handleChange(e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
              error ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="John"
            autoFocus
          />
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export const LastNameStep = ({ data, onChange, onValidation }) => {
  const [error, setError] = useState('');

  const validate = (value) => {
    if (!value?.trim()) {
      setError('Last name is required');
      onValidation(false);
      return false;
    }
    setError('');
    onValidation(true);
    return true;
  };

  const handleChange = (value) => {
    onChange('lastName', value);
    validate(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Last Name
        </h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Now your last name.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Last Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={data.lastName || ''}
            onChange={(e) => handleChange(e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
              error ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="Doe"
            autoFocus
          />
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export const EmailStep = ({ data, onChange, onValidation }) => {
  const [error, setError] = useState('');

  const validate = (value) => {
    if (!value?.trim()) {
      setError('Email is required');
      onValidation(false);
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Please enter a valid email');
      onValidation(false);
      return false;
    }
    setError('');
    onValidation(true);
    return true;
  };

  const handleChange = (value) => {
    onChange('email', value);
    validate(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Email Address
        </h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Your email address for contact.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange(e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
              error ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="john.doe@example.com"
            autoFocus
          />
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export const PhoneStep = ({ data, onChange, onValidation }) => {
  const [error, setError] = useState('');

  const validate = (value) => {
    if (!value?.trim()) {
      setError('Phone number is required');
      onValidation(false);
      return false;
    } else if (!/^[+]?[\d\s\-\(\)]+$/.test(value)) {
      setError('Please enter a valid phone number');
      onValidation(false);
      return false;
    }
    setError('');
    onValidation(true);
    return true;
  };

  const handleChange = (value) => {
    onChange('phone', value);
    validate(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Phone Number
        </h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Your phone number for contact.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => handleChange(e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
              error ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="+1 (555) 123-4567"
            autoFocus
          />
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export const LocationStep = ({ data, onChange, onValidation }) => {
  const [error, setError] = useState('');

  const validate = (value) => {
    if (!value?.trim()) {
      setError('Location is required');
      onValidation(false);
      return false;
    }
    setError('');
    onValidation(true);
    return true;
  };

  const handleChange = (value) => {
    onChange('location', value);
    validate(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Location
        </h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Your current location.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          Location *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleChange(e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ember)] ${
              error ? 'border-red-500' : 'border-[var(--border-default)]'
            }`}
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            placeholder="San Francisco, CA"
            autoFocus
          />
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};
