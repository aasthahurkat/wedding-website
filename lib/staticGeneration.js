// lib/staticGeneration.js
// Centralized utilities for Next.js static generation (getStaticPaths & getStaticProps)

import { ACCESS_GROUPS } from '../data/accessGroups';

/**
 * Generate static paths for all access groups
 * Use this for getStaticPaths in [group] pages
 *
 * @returns {object} Next.js paths configuration
 */
export function createGroupPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({
      params: { group: g.key.toLowerCase() }
    })),
    fallback: false,
  };
}

/**
 * Validate group and return props for static generation
 * Use this for getStaticProps in [group] pages
 *
 * @param {object} context - Next.js context object with params
 * @param {Array<string>} allowedGroups - Optional array of allowed group keys (e.g., ['BRIDE', 'GROOM'])
 * @returns {object} Props object or notFound
 */
export function validateGroupProps({ params }, allowedGroups = null) {
  const group = params.group?.toLowerCase() || '';
  const validGroups = ACCESS_GROUPS.map((g) => g.key.toLowerCase());

  // Check if group exists
  if (!validGroups.includes(group)) {
    return { notFound: true };
  }

  // Optional: check if group is in allowed list
  if (allowedGroups) {
    const normalizedAllowed = allowedGroups.map((g) => g.toLowerCase());
    if (!normalizedAllowed.includes(group)) {
      return { notFound: true };
    }
  }

  return { props: { group } };
}

/**
 * Shorthand for pages that are available to all groups
 */
export const getStaticPaths = createGroupPaths;

/**
 * Shorthand for props validation for all groups
 */
export const getStaticProps = validateGroupProps;
