import React, { useState } from 'react';
import { Edit2, Ban, CheckCircle, ExternalLink, Star } from 'lucide-react';
import { HOBBY_SUGGESTIONS } from '../../constants/hobby-suggestions';
import FeedbackForm from '../Forms/FeedbackForm';  // Import the FeedbackForm component
import SkillSuggest from '../HelperComponents/SkillSuggestionInputField';

export default function SessionCard({ session, status, onStatusChange, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSession, setEditedSession] = useState(session);
  const [reviewed, setReviewed] = useState(session.reviewed);
  const [isPopupVisible, setIsPopupVisible] = useState(false);  // Manage popup visibility
  const [submittedFeedback, setSubmittedFeedback] = useState(false);  // Manage feedback submission

  const allSkills = [...HOBBY_SUGGESTIONS, ...HOBBY_SUGGESTIONS];

  const handleEdit = () => {
    onEdit(session.id, editedSession);
    setIsEditing(false);
  };

  const handleReview = () => {
    setReviewed(true);
    onEdit(session.id, { ...session, reviewed: true });
    setIsPopupVisible(true);  // Show the feedback popup when "Review" is clicked
  };

  const handleAddSkill = (type, skill) => {
    setEditedSession({
      ...editedSession,
      [type]: [skill],  // Only allow one skill by making it an array with a single skill
    });
  };

  const handleRemoveSkill = (type) => {
    setEditedSession({
      ...editedSession,
      [type]: [], // Remove the selected skill
    });
  };

  const renderActions = () => {
    if (status === 'Scheduled') {
      return (
        <>
          <a
            href={session.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <ExternalLink size={16} className="mr-1" />
            Join Session
          </a>
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            <Edit2 size={16} className="mr-1" />
            Edit
          </button>
          <button
            onClick={() => onStatusChange(session.id, 'canceled')}
            className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            <Ban size={16} className="mr-1" />
            Cancel
          </button>
          { !session.reviewed ? (
            <button
              onClick={handleReview}
              className="inline-flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
            >
              <Star size={16} className="mr-1" />
              Review
            </button>
          ): (
            <span className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded">
            Thanks for the Review!
          </span>
          ) }
        </>
      );
    }

    if (session.reviewed) {
      return (
        <span className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded">
          <CheckCircle size={16} className="mr-1" />
          Reviewed
        </span>
      );
    }

    return null;
  };

  const handleFeedbackSubmit = () => {
    setSubmittedFeedback(true);  // Set the flag after feedback submission
    setIsPopupVisible(false);  // Close the feedback form
  };

  const closeForm = () => {
    setIsPopupVisible(false);  // Close the feedback form
  };

  if (isEditing) {
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
            <div className="space-y-4">
              {/* Updated to use "date" instead of "datetime-local" */}
              <input
                type="date"
                value={editedSession.date.slice(0, 10)} // Slice to get only the date portion (YYYY-MM-DD)
                onChange={(e) => setEditedSession({ ...editedSession, date: e.target.value })}
                className="w-full p-2 border rounded"
              />
    
              {/* Skills Offered */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills Offered
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedSession.skillsOffered.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer"
                      onClick={() => handleRemoveSkill('skillsOffered')}
                    >
                      {skill} &times;
                    </span>
                  ))}
                </div>
                <select
                  onChange={(e) => {
                    handleAddSkill('skillsOffered', e.target.value);
                    e.target.value = '';
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a skill</option>
                  {allSkills
                    .filter((skill) => !editedSession.skillsOffered.includes(skill))
                    .map((skill, index) => (
                      <option key={index} value={skill}>
                        {skill}
                      </option>
                    ))}
                </select>
              </div> */}
              <SkillSuggest feildName={"Skill Offered"} isMultiple={false}/>
              <SkillSuggest feildName={"Skills Acquiring"} isMultiple={false}/>
              {/* Skills Acquiring */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills Acquiring
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedSession.skillsAcquiring.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm cursor-pointer"
                      onClick={() => handleRemoveSkill('skillsAcquiring')}
                    >
                      {skill} &times;
                    </span>
                  ))}
                </div>
                <select
                  onChange={(e) => {
                    handleAddSkill('skillsAcquiring', e.target.value);
                    e.target.value = '';
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a skill</option>
                  {allSkills
                    .filter((skill) => !editedSession.skillsAcquiring.includes(skill))
                    .map((skill, index) => (
                      <option key={index} value={skill}>
                        {skill}
                      </option>
                    ))}
                </select>
              </div> */}
    
              <input
                type="url"
                value={editedSession.link}
                onChange={(e) => setEditedSession({ ...editedSession, link: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Session link"
              />
    
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{session.userTwo.name}</h3>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-2">
                <span
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {session.skillTaughtByUserOne.name}
                </span>
            </div>
            <div className="flex flex-wrap gap-2">
            <span
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {session.skillTaughtByUserTwo.name}
                </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {renderActions()}
      </div>

      {/* Feedback Popup */}
      {isPopupVisible && !submittedFeedback && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Instructor Feedback</h2>
            <FeedbackForm
              mentorName={session.mentorName}  // Pass mentor name as a prop
              closeForm={closeForm}  // Pass closeForm function to close the form
              onSubmit={handleFeedbackSubmit}  // Handle feedback submission
            />
          </div>
        </div>
      )}

      {/* Thank You Message */}
      {submittedFeedback && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          <h3 className="text-xl font-semibold">Thank You for Your Feedback!</h3>
        </div>
      )}
    </div>
  );
}
