import React from 'react';
import { User, Briefcase, Target, MessageSquare, CheckCircle } from 'lucide-react';

export const ReviewStep = ({ data, onSubmit, isSubmitting }) => {
  const formatRoleNames = (roleIds) => {
    const roleMap = {
      'mulesoft-architect': 'MuleSoft Architect',
      'integration-engineer': 'Integration Engineer',
      'ai-specialist': 'AI Specialist',
      'solution-architect': 'Solution Architect',
      'project-manager': 'Project Manager'
    };
    return roleIds.map(id => roleMap[id] || id).join(', ');
  };

  const formatAvailability = (availability) => {
    const availabilityMap = {
      'immediate': 'Immediately',
      '2-weeks': '2 weeks',
      '1-month': '1 month',
      '2-months': '2 months',
      '3-months': '3+ months'
    };
    return availabilityMap[availability] || availability;
  };

  const formatWorkType = (workType) => {
    const workTypeMap = {
      'full-time': 'Full-time',
      'part-time': 'Part-time',
      'contract': 'Contract',
      'freelance': 'Freelance'
    };
    return workTypeMap[workType] || workType;
  };

  const formatNoticePeriod = (noticePeriod) => {
    const noticeMap = {
      'immediate': 'Immediate',
      '1-week': '1 week',
      '2-weeks': '2 weeks',
      '1-month': '1 month',
      '2-months': '2 months',
      '3-months': '3 months'
    };
    return noticeMap[noticePeriod] || noticePeriod;
  };

  const ReviewSection = ({ icon: Icon, title, children }) => (
    <div className="border border-[var(--border-default)] rounded-lg p-4" style={{ background: 'var(--bg-card)' }}>
      <div className="flex items-center mb-3">
        <Icon className="h-5 w-5 text-[var(--ember)] mr-2" />
        <h4 className="font-semibold text-[var(--text-primary)]">{title}</h4>
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  const ReviewItem = ({ label, value }) => (
    <div className="flex justify-between items-start">
      <span className="text-sm text-[var(--text-muted)] min-w-0 flex-1">{label}</span>
      <span className="text-sm text-[var(--text-primary)] text-right ml-4 break-words">{value || 'Not provided'}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Review Your Application
        </h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Please review your information before submitting. You can go back to make changes if needed.
        </p>
      </div>

      <div className="space-y-4">
        <ReviewSection icon={User} title="Personal Information">
          <ReviewItem label="Name" value={`${data.firstName || ''} ${data.lastName || ''}`} />
          <ReviewItem label="Email" value={data.email} />
          <ReviewItem label="Phone" value={data.phone} />
          <ReviewItem label="Location" value={data.location} />
        </ReviewSection>

        <ReviewSection icon={Briefcase} title="Professional Experience">
          <ReviewItem label="Current Role" value={data.currentRole} />
          <ReviewItem label="Company" value={data.company} />
          <ReviewItem label="Years of Experience" value={data.experience ? `${data.experience} years` : ''} />
          <ReviewItem label="LinkedIn" value={data.linkedin} />
          <ReviewItem label="Portfolio" value={data.portfolio} />
          {data.skills && (
            <div className="mt-2">
              <span className="text-sm text-[var(--text-muted)]">Skills: </span>
              <span className="text-sm text-[var(--text-primary)]">{data.skills}</span>
            </div>
          )}
        </ReviewSection>

        <ReviewSection icon={Target} title="Role Preferences">
          <ReviewItem label="Interested Roles" value={formatRoleNames(data.interestedRoles || [])} />
          <ReviewItem label="Availability" value={formatAvailability(data.availability)} />
          <ReviewItem label="Work Type" value={formatWorkType(data.workType)} />
          {data.salaryExpectation && (
            <ReviewItem 
              label="Salary Expectation" 
              value={`$${data.salaryExpectation.toLocaleString()}/year`} 
            />
          )}
          {data.remotePreference && (
            <ReviewItem label="Remote Preference" value={data.remotePreference.replace('-', ' ')} />
          )}
        </ReviewSection>

        <ReviewSection icon={MessageSquare} title="Additional Information">
          <div className="mb-3">
            <span className="text-sm text-[var(--text-muted)]">Why Zentiti:</span>
            <p className="text-sm text-[var(--text-primary)] mt-1">{data.whyZentiti}</p>
          </div>
          {data.whyGoodFit && (
            <div className="mb-3">
              <span className="text-sm text-[var(--text-muted)]">Why Good Fit:</span>
              <p className="text-sm text-[var(--text-primary)] mt-1">{data.whyGoodFit}</p>
            </div>
          )}
          <ReviewItem label="Notice Period" value={formatNoticePeriod(data.noticePeriod)} />
          {data.resume && (
            <ReviewItem label="Resume" value={data.resume} />
          )}
          {data.additionalInfo && (
            <div className="mt-2">
              <span className="text-sm text-[var(--text-muted)]">Additional Info:</span>
              <p className="text-sm text-[var(--text-primary)] mt-1">{data.additionalInfo}</p>
            </div>
          )}
        </ReviewSection>
      </div>

      <div className="border border-[var(--border-default)] rounded-lg p-4" style={{ background: 'var(--bg-section-alt)' }}>
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-1">Ready to Submit</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              By submitting this application, you confirm that all information provided is accurate and complete.
              We'll review your application and get back to you within 5-7 business days.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
          style={{ background: 'var(--bg-card)' }}
        >
          Make Changes
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-[var(--ember)] text-white rounded-lg hover:bg-[var(--ember-glow)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </div>
  );
};
