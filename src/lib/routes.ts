const Routes = {
  ADMIN_LOGIN: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
  ADMIN_LOGOUT: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user/logout`,

  LIST_CATEGORIES: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/category/list`,
  ADD_CATEGORY: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/category/store`,
  UPDATE_CATEGORY: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/category/update/${id}`,
  DELETE_CATEGORY: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/category/delete/${id}`,
  GET_LEARNING_TRACKS_BY_CATEGORY: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/category/learning-tracks/${id}`,
  ADD_LEARNING_TRACK_TO_CATEGORY: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/category/add-learning-track/${id}`,
  REMOVE_LEARNING_TRACK_FROM_CATEGORY: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/category/remove-learning-track/${id}`,

  LIST_LEARNING_TRACKS: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-track/list`,
  ADD_LEARNING_TRACK: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-track/store`,
  UPDATE_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-track/update/${id}`,
  DELETE_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-track/delete/${id}`,
  GET_CATEGORIES_BY_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-track/categories/${id}`,
  ADD_CATEGORY_TO_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-track/add-category/${id}`,
  REMOVE_CATEGORY_FROM_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-track/remove-category/${id}`,
  GET_COURSES_BY_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-track/courses/${id}`,
  ADD_COURSE_TO_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-track/add-course/${id}`,
  REMOVE_COURSE_FROM_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-track/remove-course/${id}`,

  LIST_COURSES: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/list`,
  ADD_COURSE: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/store`,
  UPDATE_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/update/${id}`,
  DELETE_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/delete/${id}`,
  GET_LEARNING_TRACKS_BY_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/learning-tracks/${id}`,
  ADD_LEARNING_TRACK_TO_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/add-learning-track/${id}`,
  REMOVE_LEARNING_TRACK_FROM_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/remove-learning-track/${id}`,
  GET_TOPICS_BY_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/topics/${id}`,
  ADD_TOPIC_TO_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/add-topic/${id}`,
  REMOVE_TOPIC_FROM_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/remove-topic/${id}`,

  LIST_TOPICS: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/topic/list`,
  ADD_TOPIC: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/topic/store`,
  UPDATE_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/topic/update/${id}`,
  DELETE_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/topic/delete/${id}`,
  GET_COURSES_BY_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/topic/courses/${id}`,
  ADD_COURSE_TO_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/topic/add-course/${id}`,
  REMOVE_COURSE_FROM_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/topic/remove-course/${id}`,
  GET_ASSIGNMENTS_BY_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/assignment/list/${id}`,
  GET_ASSIGNMENT_BY_ID: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/assignment/detail/${id}`,
  ADD_ASSIGNMENT_TO_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/assignment/store/${id}`,
  UPDATE_ASSIGNMENT_FROM_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/assignment/update/${id}`,
  DELETE_ASSIGNMENT_FROM_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/assignment/delete/${id}`,
  GET_LEARNING_MATERIALS_BY_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-material/list/${id}`,
  ADD_LEARNING_MATERIAL_TO_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-material/store/${id}`,
  UPDATE_LEARNING_MATERIAL_FROM_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-material/update/${id}`,
  DELETE_LEARNING_MATERIAL_FROM_TOPIC: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learning-material/delete/${id}`,
  GET_ASSIGNMENT_METRICS_BY_ASSIGNMENT: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/assignment/assignment-metrics/${id}`,
  ADD_ASSIGNMENT_METRIC_TO_ASSIGNMENT: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/assignment/add-assignment-metric/${id}`,
  REMOVE_ASSIGNMENT_METRIC_FROM_ASSIGNMENT: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/assignment/remove-assignment-metric/${id}`,

  LIST_LEARNERS: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learner/list`,
  ADD_MENTOR_TO_LEARNER: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learner/assign-mentor/${id}`,
  REMOVE_MENTOR_FROM_LEARNER: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learner/remove-mentor/${id}`,
  GET_MENTORS_BY_LEARNER: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/learner/assigned-mentors/${id}`,

  LIST_MENTORS: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/mentor/list`,
  ADD_LEARNER_TO_MENTOR: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/mentor/assign-learner/${id}`,
  REMOVE_LEARNER_FROM_MENTOR: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/mentor/remove-learner/${id}`,
  GET_LEARNERS_BY_MENTOR: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/mentor/assigned-learners/${id}`,

  LEARNER_LOGIN: `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/login`,
  LEARNER_LOGOUT: `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/logout`,

  LEARNER_LIST_CATEGORIES: `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/category/list`,

  LEARNER_LIST_LEARNING_TRACKS: `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/learning-track/list`,
  LEARNER_GET_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/learning-track/detail/${id}`,
  LEARNER_GET_CATEGORIES_BY_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/learning-track/categories/${id}`,
  LEARNER_GET_COURSES_BY_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/learning-track/courses/${id}`,

  LEARNER_LIST_COURSES: `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/course/list`,
  LEARNER_GET_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/course/detail/${id}`,
  LEARNER_GET_LEARNING_TRACKS_BY_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/course/learning-tracks/${id}`,
  LEARNER_GET_TOPICS_BY_COURSE: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/course/topics/${id}`,

  LEARNER_GET_SUBMISSIONS_OF_ASSIGNMENTS: `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/assignment/list`,
  LEARNER_GET_SUBMISSION: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/assignment/detail/${id}`,
  LEARNER_SUBMIT_ASSIGNMENT: `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/assignment/store`,
  LEARNER_GET_MY_SUBMISSIONS: `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/assignment/my-assignment-submissions`,
  LEARNER_GET_REVIEWS_OF_SUBMISSION: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/learner/review/list/${id}`,

  MENTOR_LOGIN: `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentor/login`,
  MENTOR_LOGOUT: `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentor/logout`,

  MENTOR_GET_MY_SUBMISSIONS: `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentor/assignment/list`,
  MENTOR_GET_SUBMISSION: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentor/assignment/detail/${id}`,

  MENTOR_GET_REVIEWS_OF_SUBMISSION: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentor/review/list/${id}`,
  MENTOR_ADD_REVIEW: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentor/review/store/${id}`,
};

export default Routes;
