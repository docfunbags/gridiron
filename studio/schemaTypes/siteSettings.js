export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'activeSchedule',
      title: 'Active Operating Schedule',
      type: 'reference',
      to: [{ type: 'schedule' }],
      description: 'Select the schedule currently shown on the website (e.g., switch from Winter to Summer hours here).'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Site Settings'
      }
    }
  }
}
