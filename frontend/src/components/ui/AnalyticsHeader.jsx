export const Header = () => {
  const date = new Date();
  let day = date.getDay();
  let newDate = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const fullDate = `${days[day]}, ${months[month]} ${newDate} ${year}`;

  return (
    <div className="my-5">
      <div>
        <h1 className="text-3xl font-bold">Hello, Tara</h1>
        <div className="mt-2 text-sm">
          <time>{fullDate}</time>
        </div>
      </div>
    </div>
  );
};
