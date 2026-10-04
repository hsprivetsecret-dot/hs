-- Reproducible English starter content for a fresh Supabase environment.
insert into public.wishes (category_id,style_id,language_id,title,content,slug)
select c.id,s.id,l.id,v.title,v.content,v.slug
from (values
('mom','sweet','A Birthday Hug for Mom','Happy birthday, Mom! Your love makes every ordinary day feel special. Wishing you a day full of laughter, comfort, and everything you love.','mom-sweet-birthday-hug'),
('mom','funny','Happy Birthday to My Favorite Mom','Happy birthday, Mom! Thanks for loving me even when I was the reason the house was suddenly very quiet. Today you deserve cake, rest, and absolutely no drama.','mom-funny-favorite-mom'),
('mom','short','Short Birthday Wish for Mom','Happy birthday, Mom! Wishing you endless smiles, good health, and all the happiness you deserve.','mom-short-endless-smiles'),
('mom','respectful','A Respectful Birthday Wish for Mom','Wishing you a beautiful birthday, Mom. Your kindness, strength, and wisdom continue to inspire me every day.','mom-respectful-wisdom'),
('dad','funny','Birthday Wish for Dad','Happy birthday, Dad! Thanks for the advice, the jokes, and for pretending not to notice when I ignored the advice.','dad-funny-advice'),
('dad','emotional','For the Man Who Always Stood by Me','Happy birthday, Dad. Your steady support has been one of the greatest gifts in my life. I hope today reminds you how deeply you are appreciated.','dad-emotional-support'),
('dad','short','Short Birthday Wish for Dad','Happy birthday, Dad! Wishing you health, peace, success, and a fantastic year ahead.','dad-short-fantastic-year'),
('brother','sweet','Sweet Birthday Wish for Brother','Happy birthday, brother! Life is better with your jokes, support, and unforgettable memories. I hope this year brings you everything you are working for.','brother-sweet-memories'),
('brother','emotional','A Heartfelt Birthday Wish for Brother','Happy birthday, bro. No matter where life takes us, I will always be grateful to have grown up with you and to have you in my corner.','brother-emotional-corner'),
('brother','short','Short Birthday Wish for Brother','Happy birthday, bro! Keep smiling, keep winning, and keep being awesome.','brother-short-awesome'),
('sister','funny','Funny Birthday Wish for Sister','Happy birthday, sis! You have a special talent for borrowing my things and somehow making them yours forever. Have the best day!','sister-funny-borrowing'),
('sister','romantic','Warm Birthday Wish for Sister','Happy birthday to an incredible sister. Your warmth, kindness, and energy make every family moment brighter.','sister-romantic-warmth'),
('sister','short','Short Birthday Wish for Sister','Happy birthday, sis! May your day be bright, joyful, and full of beautiful surprises.','sister-short-bright'),
('best-friend','sweet','Sweet Birthday Wish for Best Friend','Happy birthday to the friend who makes every adventure better. I hope this year brings you more laughter, more memories, and more reasons to smile.','best-friend-sweet-adventures'),
('best-friend','funny','Another Year of Chaos','Happy birthday! Another year older, wiser, and somehow still responsible for most of our questionable decisions. Never change.','best-friend-funny-chaos'),
('best-friend','short','Short Best Friend Birthday Wish','Happy birthday, bestie! More laughs, more adventures, and more unforgettable memories this year.','best-friend-short-adventures'),
('best-friend','cool','Cool Birthday Wish for Best Friend','Happy birthday, legend! Keep your energy high, your dreams bigger, and your circle full of people who genuinely celebrate you.','best-friend-cool-legend'),
('best-friend','emotional','A Birthday Wish for a Lifelong Friend','Happy birthday to someone who has seen every version of me and stayed. I hope life gives you the same loyalty and kindness you give to others.','best-friend-emotional-loyalty'),
('partner','funny','Funny Birthday Wish for My Love','Happy birthday, love! I promise to share the cake, tolerate your birthday demands, and keep loving you even when you steal the blanket.','partner-funny-blanket'),
('partner','emotional','Happy Birthday to My Safe Place','Happy birthday, my love. Thank you for being the person I can laugh with, dream with, and come home to. I am grateful for you every day.','partner-emotional-safe-place'),
('partner','short','Short Romantic Birthday Wish','Happy birthday, my love. You make life sweeter simply by being in it.','partner-short-sweeter-life'),
('partner','heart-touching','A Birthday Wish From the Heart','Happy birthday to the person who makes my heart feel at home. May this year bring us countless moments we will remember forever.','partner-heart-touching-home'),
('colleague','sweet','Sweet Birthday Wish for a Colleague','Happy birthday! Wishing you a day full of smiles and a year filled with great opportunities, supportive people, and well-earned success.','colleague-sweet-opportunities'),
('colleague','funny','Funny Birthday Wish for a Colleague','Happy birthday! May your meetings be short, your inbox quiet, your coffee strong, and your cake considerably larger than your workload.','colleague-funny-inbox'),
('colleague','cool','Cool Birthday Wish for a Colleague','Happy birthday! Keep doing great work, taking bold opportunities, and making the workplace a better place to be.','colleague-cool-bold'),
('colleague','respectful','Professional Birthday Wish for a Colleague','Wishing you a very happy birthday and continued success. May the year ahead bring meaningful achievements, good health, and new opportunities.','colleague-respectful-success'),
('son','funny','Funny Birthday Wish for Son','Happy birthday, son! You may be older now, but you will always be the kid whose snacks somehow disappear from the kitchen.','son-funny-snacks'),
('son','emotional','A Proud Birthday Wish for Son','Happy birthday, son. Watching you grow, learn, and become your own person is one of the greatest joys of my life. Keep believing in yourself.','son-emotional-proud'),
('daughter','sweet','Sweet Birthday Wish for Daughter','Happy birthday, dear daughter! Your smile brings so much light to our family. May your year be full of beautiful surprises and dreams coming true.','daughter-sweet-light'),
('daughter','funny','Funny Birthday Wish for Daughter','Happy birthday, daughter! Somehow you are growing up faster every year, but you will always be the boss of at least one corner of our home.','daughter-funny-boss'),
('teacher','sweet','Sweet Birthday Wish for a Teacher','Happy birthday to a wonderful teacher. Thank you for making learning meaningful and for encouraging people to believe in themselves.','teacher-sweet-learning'),
('teacher','short','Short Birthday Wish for Teacher','Happy birthday! Wishing you health, happiness, inspiration, and a wonderful year ahead.','teacher-short-inspiration'),
('someone-special','sweet','Sweet Birthday Wish for Someone Special','Happy birthday to someone who brings a little more warmth and happiness wherever they go. I hope your day is truly special.','someone-special-sweet-warmth'),
('someone-special','funny','Funny Birthday Wish for Someone Special','Happy birthday! I hope your cake is bigger than your problems and your celebrations last much longer than your responsibilities.','someone-special-funny-cake'),
('someone-special','heart-touching','A Heartfelt Wish for Someone Special','Happy birthday to someone who holds a special place in my thoughts and heart. May this new chapter bring you peace, joy, and beautiful moments.','someone-special-heart-touching'),
('someone-special','short','Short Wish for Someone Special','Happy birthday! Keep smiling, keep shining, and have a beautiful year ahead.','someone-special-short-shining')
) as v(category_slug,style_slug,title,content,slug)
join public.wish_categories c on c.slug=v.category_slug
join public.wish_styles s on s.slug=v.style_slug
join public.languages l on l.code='en'
on conflict (slug) do nothing;
