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
  let hour = (total / 60).toFixed(2);
  return `${hour.split('.')[0]} hr ${hour.split('.')[1]} min`;
};

module.exports = { FormatDate, FormatHour };
