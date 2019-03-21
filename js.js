
// sns-event

router.sns_event
  .event('project:update:1', (e) => {
    e.payload
  })
  .event('project:update:2', () => {})
