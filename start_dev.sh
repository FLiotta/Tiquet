(
  cd server;
  source env/scripts/activate;
  python app.py;
) &
(
  cd client;
  npm start;
)
