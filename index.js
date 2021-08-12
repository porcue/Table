document.addEventListener('DOMContentLoaded', () => {
  const studentName = document.querySelector('.name');
  const studentSurname = document.querySelector('.surname');
  const studentMiddlename = document.querySelector('.middle__name');
  const birthDate = document.querySelector('.birth__date');
  const studyYear = document.querySelector('.year');
  const department = document.querySelector('.department');
  const button = document.querySelector('.button');
  const table = document.createElement('table');
  const error = document.querySelector('.error');
  const inputs = document.querySelectorAll('.student');
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const milliDay = 1000 * 60 * 60 * 24;
  const tooltipOne = document.querySelector('.tooltip-one');
  const tooltipTwo = document.querySelector('.tooltip-two');
  const filterWrapper = document.querySelector('.filter__container');
  const filterName = document.querySelector('.filter__name');
  const filterDepartment = document.querySelector('.filter__department');
  const filterYear = document.querySelector('.filter__year');
  table.classList.add('table');
  let th1;
  let th2;
  let th3;
  let th4;
  let arr;
  let task;

  if (localStorage.getItem('students') !== null) {
    arr = JSON.parse(localStorage.getItem('students'));
  } else {
    arr = [];
  }

  function validateYear() {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      if (studyYear.value < 2000 || studyYear.value > date.getFullYear()) {
        button.disabled = true;
        studyYear.classList.add('test');
        tooltipTwo.classList.add('active');
      } else {
        button.disabled = false;
        studyYear.classList.remove('test');
        tooltipTwo.classList.remove('active');
      }
    }, 2000);
  }
  studyYear.addEventListener('input', validateYear);

  function validateBirth() {
    const birth = new Date(birthDate.value);
    const birthYear = birth.getFullYear();
    if (birthYear < 1900 || birthYear > date.getFullYear()) {
      button.disabled = true;
      birthDate.classList.add('test');
      tooltipOne.classList.add('active');
    } else {
      button.disabled = false;
      birthDate.classList.remove('test');
      tooltipOne.classList.remove('active');
    }
  }
  birthDate.addEventListener('change', validateBirth);

  function validateForm() {
    inputs.forEach((el) => {
      if (!el.value.trim()) {
        error.classList.add('active');
        button.removeEventListener('click', createStudent);
      } else {
        button.addEventListener('click', createStudent);
      }
    });
  }

  function filterStudentName() {
    for (let i = 1; i < table.children.length; i++) {
      if (table.children[i].children[0].textContent.search(filterName.value.trim()) == -1) {
        table.children[i].classList.add('hide');
      }else{
        table.children[i].classList.remove('hide');
      }
    }
  }

  function filterStudentDepartment() {
    for (let i = 1; i < table.children.length; i++) {
      if (table.children[i].children[1].textContent.search(filterName.value.trim()) == -1) {
        table.children[i].classList.add('hide');
      }else{
        table.children[i].classList.remove('hide');
      }
    }
  }

  function filterStudentYears() {
    for (let i = 1; i < table.children.length; i++) {
      if (table.children[i].children[3].textContent.search(filterName.value.trim()) == -1) {
        table.children[i].classList.add('hide');
      }else{
        table.children[i].classList.remove('hide');
      }
    }
  }

  function insertAfter(el, ref) {
    return ref.parentNode.insertBefore(el, ref.nextSibling);
  }

  function sortName() {
    console.log(table.children[1].children[0].textContent);
    for (let i = 1; i < table.children.length; i++) {
      for (let j = i; j < table.children.length; j++) {
        if (table.children[j].children[0].textContent.split(' ').join('') < table.children[i].children[0].textContent.split(' ').join('')) {
          replacedNode = table.replaceChild(table.children[j], table.children[i]);
          insertAfter(replacedNode, table.children[i]);
        }
      }
    }
  }

  function sortDepartment() {
    for (let i = 1; i < table.children.length; i++) {
      for (let j = i; j < table.children.length; j++) {
        if (table.children[j].children[1].textContent < table.children[i].children[1].textContent) {
          replacedNode = table.replaceChild(table.children[j], table.children[i]);
          insertAfter(replacedNode, table.children[i]);
        }
      }
    }
  }

  function sortBirth() {
    for (let i = 1; i < table.children.length; i++) {
      for (let j = i; j < table.children.length; j++) {
        if (table.children[j].children[2].getAttribute('data') < table.children[i].children[2].getAttribute('data')) {
          replacedNode = table.replaceChild(table.children[j], table.children[i]);
          insertAfter(replacedNode, table.children[i]);
        }
      }
    }
  }

  function sortYear() {
    for (let i = 1; i < table.children.length; i++) {
      for (let j = i; j < table.children.length; j++) {
        if (parseInt(table.children[j].children[3].textContent) < parseInt(table.children[i].children[3].textContent)) {
          replacedNode = table.replaceChild(table.children[j], table.children[i]);
          insertAfter(replacedNode, table.children[i]);
        }
      }
    }
  }

  function dataOfStudent(name, depart, birth, year) {
    const tr2 = document.createElement('tr');
    tr2.classList.add('new');
    const td1 = document.createElement('td');
    td1.classList.add('h');
    td1.textContent = name;
    const td2 = document.createElement('td');
    td2.classList.add('h');
    td2.classList.add('departments');
    td2.textContent = depart;
    const td3 = document.createElement('td');
    td3.setAttribute('data', birthDate.value);
    td3.classList.add('h');
    td3.textContent = birth;
    const td4 = document.createElement('td');
    td4.classList.add('h');
    td4.textContent = year;
    tr2.append(td1, td2, td3, td4);
    return {
      tr2,
      td1,
      td2,
      td3,
      td4,
    };
  }

  (function createTable() {
    const tr = document.createElement('tr');
    th1 = document.createElement('th');
    th1.textContent = 'ФИО СТУДЕНТА';
    th2 = document.createElement('th');
    th2.textContent = 'ФАКУЛЬТЕТ';
    th3 = document.createElement('th');
    th3.textContent = 'ДАТА РОЖДЕНИЯ И ВОЗРАСТ';
    th4 = document.createElement('th');
    th4.textContent = 'ГОДЫ ОБУЧЕНИЯ И НОМЕР КУРСА';
    tr.append(th1, th2, th3, th4);
    table.append(tr);
    document.body.append(table);
    return {
      tr,
      th1,
      th2,
      th3,
      th4,
    };
  }());

  function createStudent() {
    th1.addEventListener('click', sortName);
    th2.addEventListener('click', sortDepartment);
    th3.addEventListener('click', sortBirth);
    th4.addEventListener('click', sortYear);

    error.classList.remove('active');
    filterWrapper.classList.add('appear');
    const studentDate = new Date(birthDate.value);
    const studentYear = studentDate.getFullYear();
    const studentDay = studentDate.getDate();
    const studentMonth = studentDate.getMonth() + 1;
    let validMonth = studentMonth;
    const ageInDays = (date - studentDate) / milliDay;

    if (validMonth < 10) {
      validMonth = `0${studentMonth}`;
    } else {
      validMonth = studentMonth;
    }

    let finish = `${date.getFullYear() - studyYear.value} курс`;

    if ((+studyYear.value + 4) < date.getFullYear()) {
      finish = 'закончил/a обучение';
    }
    const student = {
      name: `${studentSurname.value} ${studentName.value} ${studentMiddlename.value}`,
      birth: `${studentDay}.${validMonth}.${studentYear} (${Math.floor(ageInDays / 365)} лет)`,
      year: `${studyYear.value}-${+studyYear.value + 4} (${finish})`,
      department: department.value,
    };

    arr.push(student);
    localStorage.setItem('students', JSON.stringify(arr));

    arr.forEach((el) => {
      task = dataOfStudent(el.name, el.department, el.birth, el.year).tr2;
      localStorage.setItem('students', JSON.stringify(arr));
    });

    table.append(task);

    const values = document.querySelectorAll('input');
    values.forEach((el) => {
      el.value = '';
    });
  }

  button.addEventListener('click', validateForm);
  filterName.addEventListener('input', filterStudentName);
  filterDepartment.addEventListener('input', filterStudentDepartment);
  filterYear.addEventListener('input', filterStudentYears);

  (function getStorage() {
    if (arr.length > 0) {
      document.body.append(table);
      arr.forEach((element) => {
        const showStorage = dataOfStudent(element.name, element.department, element.birth, element.year).tr2;
        table.append(showStorage);
        th1.addEventListener('click', sortName);
        th2.addEventListener('click', sortDepartment);
        th3.addEventListener('click', sortBirth);
        th4.addEventListener('click', sortYear);
      });
    }
  }());
});
