from app import create_app

if __name__ == "__main__":
    app = create_app(log=True)
    app.run(debug=True)