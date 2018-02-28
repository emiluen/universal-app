import baseUrl from '../constants/baseUrl';

export default (member) => {
  if (!member) {
    return null;
  }

  const title = 'Check out my Personality Profile';
  const message = 'This is my Personality Profile. Try it out yourself.';
  const url = `${baseUrl}profile/${member.uid}`;
  const messageUrl = `${message} ${url}`;
  const imageUrl = 'https://images.contentful.com/adbfifosu0wp/3e6bsJfLLic0e4aWaSWoyc/a453aeb5144a967bac42d2806b966295/mbti-test-600.png';

  return {
    title,
    message,
    url,
    messageUrl,
    imageUrl,
    hashtags: ['personality', 'profile'],
  };
};
