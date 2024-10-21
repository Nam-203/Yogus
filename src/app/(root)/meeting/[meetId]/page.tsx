import React from 'react'

const MeetingRoom = ({ params }: { params: { meetId: string }}) => {
  
  return (
    <div>page {params.meetId}</div>
  )
}

export default MeetingRoom