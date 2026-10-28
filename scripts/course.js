const courses = [
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to tools and technologies used in web design and development.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program design and development.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to write functions, use parameters, return values, and handle exceptions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces classes, objects, inheritance, and encapsulation in C#.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students build dynamic web applications with JavaScript DOM manipulation.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience, accessibility, responsive design, and APIs.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseContainer = document.querySelector('#course-list');
const creditSpan = document.querySelector('#credit-count');

// Function to render course list dynamically
function displayCourses(filteredCourses) {
    courseContainer.innerHTML = ''; // Clear container

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        
        // Add completed class if completed property is true (Rubric Item 11)
        if (course.completed) {
            card.classList.add('completed');
            card.innerHTML = `<p>&#10004; ${course.subject} ${course.number}</p>`;
        } else {
            card.innerHTML = `<p>${course.subject} ${course.number}</p>`;
        }
        
        courseContainer.appendChild(card);
    });

    // Calculate total credits using reduce function (Rubric Item 10)
    const totalCredits = filteredCourses.reduce((accumulator, course) => {
        return accumulator + course.credits;
    }, 0);

    creditSpan.textContent = totalCredits;
}

// Event Listeners for Filters (Rubric Item 9)
document.querySelector('#all').addEventListener('click', () => {
    displayCourses(courses);
});

document.querySelector('#cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

document.querySelector('#wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

// Initial Render
displayCourses(courses);