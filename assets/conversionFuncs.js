const FormatDate = createdAt => {
  //2019-06-15T19:20:40.421Z
  let date = '';
  date = `${createdAt.split('T')[0].split('-')[1]}/${
    createdAt
      .split(':')[0]
      .split('-')[2]
      .split('T')[0]
  }/${createdAt.split(':')[0].split('-')[0]}`;
  return date;
};

const FormatHour = total => {
  if (total < 60) {
    return `${total} min`;
  } else if (total % 60 === 0) {
    return `${total / 60} hr`;
  } else {
    return `${Math.floor(total / 60)} hr ${total % 60} min`;
  }
};

module.exports = { FormatDate, FormatHour };
