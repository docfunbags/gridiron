export const schedule = {
  name: 'schedule',
  title: 'Operating Schedule',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Season Title',
      type: 'string',
      description: 'e.g. "Summer Hours", "Winter 2026"',
      validation: Rule => Rule.required()
    },
    {
      name: 'days',
      title: 'Daily Hours',
      type: 'array',
      of: [{
        type: 'object',
        name: 'dailySchedule',
        fields: [
          {
            name: 'day',
            title: 'Day of Week',
            type: 'string',
            options: {
              list: [
                'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                'Friday', 'Saturday', 'Sunday'
              ]
            }
          },
          { name: 'isClosed', title: 'Closed?', type: 'boolean' },
          { 
            name: 'opens', 
            title: 'Opens', 
            type: 'string', 
            hidden: ({ parent }) => parent?.isClosed 
          },
          { 
            name: 'closes', 
            title: 'Closes', 
            type: 'string', 
            hidden: ({ parent }) => parent?.isClosed 
          }
        ],
        preview: {
          select: {
            title: 'day',
            closed: 'isClosed',
            opens: 'opens',
            closes: 'closes'
          },
          prepare({ title, closed, opens, closes }) {
            return {
              title: title,
              subtitle: closed ? '🚫 Closed' : `⏰ ${opens} — ${closes}`
            }
          }
        }
      }]
    },
    {
      name: 'holidayNote',
      title: 'Holiday Note',
      type: 'string',
      initialValue: 'Usually open on Holiday Mondays — check social media for updates.'
    }
  ]
}
