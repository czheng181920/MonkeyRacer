export const getMembers = () => fetch('/api/members')
  .then(res => res.json())
  .catch((err) => {
    console.log(err);
  });