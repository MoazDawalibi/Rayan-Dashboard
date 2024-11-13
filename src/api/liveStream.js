export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjZTgwOGMyMS1iZTdiLTQxMjQtODRiYi00NWEyMjVmMTQyNmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY2MTM0NzI1OCwiZXhwIjoxNjYxOTUyMDU4fQ.TTxiDhRPsvVk2DxHaQjr1eHKiLADeuxwRBCOxPY6XA8";
// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ region: "sg001" }),
  });

  const { meetingId } = await res.json();
  return meetingId;
};