// lib/eventHelpers.js
// Centralized utilities for accessing group-specific event properties

/**
 * Generic helper to get a property value from an event based on user group
 * Handles both string values and group-specific object values
 *
 * @param {object} event - The event object
 * @param {string} userGroup - The user's group (BRIDE, GROOM, FRIENDS, etc.)
 * @param {string} propertyName - The property name to retrieve
 * @returns {string} The property value for the user's group
 */
export const getEventProperty = (event, userGroup, propertyName) => {
  const value = event[propertyName];

  // If it's a string, return it directly
  if (typeof value === 'string') {
    return value;
  }

  // If it's an object, try to get the group-specific value
  if (typeof value === 'object' && value !== null) {
    // First try the user's specific group
    if (value[userGroup]) {
      return value[userGroup];
    }

    // Fallback to common groups in order of priority
    return value.FRIENDS || value.BRIDE || value.GROOM || value.INVITEES || value.GUESTS || '';
  }

  return '';
};

/**
 * Get event title for a specific user group
 * @param {object} event - The event object
 * @param {string} userGroup - The user's group
 * @returns {string} The event title
 */
export const getEventTitle = (event, userGroup) => {
  return getEventProperty(event, userGroup, 'title');
};

/**
 * Get event description for a specific user group
 * @param {object} event - The event object
 * @param {string} userGroup - The user's group
 * @returns {string} The event description
 */
export const getEventDescription = (event, userGroup) => {
  return getEventProperty(event, userGroup, 'description');
};

/**
 * Get event location for a specific user group
 * @param {object} event - The event object
 * @param {string} userGroup - The user's group
 * @returns {string} The event location
 */
export const getEventLocation = (event, userGroup) => {
  return getEventProperty(event, userGroup, 'location');
};

/**
 * Get event time for a specific user group
 * @param {object} event - The event object
 * @param {string} userGroup - The user's group
 * @returns {string} The event time
 */
export const getEventTime = (event, userGroup) => {
  return getEventProperty(event, userGroup, 'time');
};

/**
 * Get event map query for a specific user group
 * @param {object} event - The event object
 * @param {string} userGroup - The user's group
 * @returns {string} The event map query
 */
export const getEventMapQuery = (event, userGroup) => {
  return getEventProperty(event, userGroup, 'mapQuery');
};

/**
 * Get event image for a specific user group
 * @param {object} event - The event object
 * @param {string} userGroup - The user's group
 * @returns {string} The event image filename
 */
export const getEventImage = (event, userGroup) => {
  return getEventProperty(event, userGroup, 'image');
};

/**
 * Get event ID, ensuring it's always a string
 * @param {object} event - The event object
 * @returns {string} The event ID
 */
export const getEventId = (event) => {
  if (!event) return '';
  if (typeof event.id === 'string') return event.id;
  if (typeof event.id === 'object' && event.id.FRIENDS) {
    return event.id.FRIENDS;
  }
  return event.id || '';
};
