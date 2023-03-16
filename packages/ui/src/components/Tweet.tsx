import { useEffect, useState } from 'react';

export default function Tweet({ tweetID }: TweetProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ((window as any).twttr) {
      (window as any).twttr.widgets
        .createTweet(tweetID, document.getElementById(tweetID), {
          align: 'center',
          conversation: 'none',
          dnt: true,
          theme: 'dark',
        })
        .then(function () {
          debugger;
          console.log('Tweet added.');
        })
        .then(() => setIsLoading(false));
    }
  }, [tweetID]);

  return (
    <div className="w-full animate-fadeIn" id={tweetID}>
      {isLoading && <p>LOADING</p>}
    </div>
  );
}

interface TweetProps {
  tweetID: string;
}
