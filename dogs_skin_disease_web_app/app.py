from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import requests
from io import BytesIO
from datetime import datetime
import json
import base64
from flask_mail import Mail, Message


app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a strong secret key

# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Example using Gmail's SMTP
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'lghmalith@gmail.com'
app.config['MAIL_PASSWORD'] = 'badwccpklsbwwlzs'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

# Load the trained model
model = load_model("../dogs_skin_disease_final_model.h5")

# Load medications from JSON file
with open('medications.json') as f:
    medications = json.load(f)

# Dummy user storage (replace with database in production)
users = {

}

def prepare_image(img):
    try:
        img = img.resize((150, 150))
        img = img.convert('RGB')
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0
        return img_array, None
    except Exception as e:
        return None, str(e)

labels = {
    0: 'Bacterial_dermatosis',
    1: 'Fungal_infections',
    2: 'Healthy',
    3: 'Hypersensitivity_allergic_dermatosis'
}

similar_images = {
    'Bacterial_dermatosis': ['url1_to_similar_image1', 'url2_to_similar_image2'],
    'Fungal_infections': ['url1_to_similar_image1', 'url2_to_similar_image2'],
    'Healthy': ['url1_to_similar_image1', 'url2_to_similar_image2'],
    'Hypersensitivity_allergic_dermatosis': ['url1_to_similar_image1', 'url2_to_similar_image2']
}

@app.route("/", methods=["GET"])
def splash():
    return render_template("splash.html")

@app.route("/homepage", methods=["GET"])
def homepage():
    # Check if the user is logged in
    if "user" in session:
        user = session["user"]
        user_logged_in = True  # User is logged in
        return render_template("index.html", user=user, user_logged_in=user_logged_in)
    else:
        user_logged_in = False  # User is logged in
        return render_template("index.html", user_logged_in=user_logged_in)
    
@app.route("/profile", methods=["GET"])
def profile():
    # Check if the user is logged in
    if "user" in session:
        user = session["user"]  # Get the user data from the session
        user_logged_in = True  # User is logged in
        return render_template("profile.html", user=user, user_logged_in=user_logged_in)
    else:
        # If not logged in, redirect to the login page
        return redirect(url_for("login"))

@app.route("/UserManagementforadmin", methods=["GET"])
def UserManagementforadmin():
    # Check if the user is logged in
    if "user" in session:
        user = session["user"]  # Get the user data from the session
        user_logged_in = True  # User is logged in
        token = session["token"]
        return render_template("UserManagementforadmin.html", user=user, user_logged_in=user_logged_in, token=token)
    else:
        # If not logged in, redirect to the login page
        return redirect(url_for("login"))
        
@app.route("/ItemManagement", methods=["GET"])
def ItemManagement():
    # Check if the user is logged in
    if "user" in session:
        user = session["user"]  # Get the user data from the session
        user_logged_in = True  # User is logged in
        token = session["token"]
        return render_template("ItemManagement.html", user=user, user_logged_in=user_logged_in, token=token)
    else:
        # If not logged in, redirect to the login page
        return redirect(url_for("login"))
      

@app.route("/service", methods=["GET"])
def service():
    return render_template("service.html")

@app.route("/pet", methods=["GET"])
def pet():
    return render_template("pet.html")

@app.route("/clinic", methods=["GET"])
def clinic():
    return render_template("clinic.html")

@app.route("/contact", methods=["GET"])
def contact():
    return render_template("contact.html")

@app.route("/buy", methods=["GET"])
def buy():
    return render_template("buy.html")

@app.route("/checkout", methods=["GET"])
def checkout():
    if "user" in session:
        user = session["user"]  # Get the user data from the session
        user_logged_in = True  # User is logged in
        return render_template("checkout.html", user=user, user_logged_in=user_logged_in)
    else:
        # If not logged in, redirect to the login page
        return redirect(url_for("login"))
    
@app.route("/adminpage", methods=["GET"])
def adminpage():
    if "user" in session:
        user = session["user"]  # Get the user data from the session
        token = session["token"]
        user_logged_in = True  # User is logged in
        return render_template("admin.html", user=user, user_logged_in=user_logged_in, token=token)
    else:
        # If not logged in, redirect to the login page
        return redirect(url_for("login"))
    

@app.route("/order", methods=["GET"])
def order():
    result = request.args.get('result', default='Unknown', type=str)
    # Process the result as needed
    return render_template('orderlist.html', result=result)

@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)  # Remove the user from session
    session.pop("token", None)  # Optionally remove the token from session
    return redirect(url_for("login"))


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        # Prepare the payload for the external API
        payload = {
            "username": username,
            "password": password
        }

        # Send POST request to the external API
        try:
            response = requests.post("http://127.0.0.1:3000/api/user/login", json=payload)
            
            # Print the raw response for debugging
            print("Response status code:", response.status_code)
            print("Response text:", response.text)
            
            # Attempt to print the JSON data, if available
            try:
                response_data = response.json()
                print("Response JSON:", response_data)
            except ValueError:
                print("Response is not in JSON format.")
            
            # Check if login was successful
            if response.status_code == 200:  # Adjust based on API response format
                 response_data = response.json()
                 token = response_data.get("token")
                 user_data = response_data.get("user")

                 # Store the token and user data in the session
                 session["token"] = token
                 session["user"] = {
                    "id": user_data["id"],
                    "username": user_data["username"],
                    "email": user_data["email"],
                    "first_name": user_data["first_name"],
                    "last_name": user_data["last_name"],
                    "phone_number": user_data["phone_number"],
                    "address": user_data["address"],
                    "role": user_data["role"]
                }
                 # Redirect to the homepage or wherever appropriate after registration
                 # Redirect to the original URL if it exists
                 # Check if 'next_url' exists in session and is a valid endpoint
                 next_url = session.get("next_url")

                 if next_url == 'modelpage':
                    try:
                        session['next_url'] = ''
                        return redirect(url_for("order"))
                    except Exception as e:
                        # Log the error or handle it as needed
                        print(f"Error in url_for: {e}")
                        if user_data["role"] == 'admin':
                           return redirect(url_for("adminpage"))
                        else:
                           return redirect(url_for("homepage"))
                 else:
                    if user_data["role"] == 'admin':
                           return redirect(url_for("adminpage"))
                    else:
                           return redirect(url_for("homepage"))
            else:
                return render_template("login.html", error="Invalid username or password")
        except requests.exceptions.RequestException as e:
            return render_template("login.html", error=f"Error connecting to API: {e}")

    return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # Collect the form data
        username = request.form["username"]
        password = request.form["password"]
        email = request.form["email"]
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        phone_number = request.form["phone_number"]
        address = request.form["address"]
        role = request.form.get("role", "user")  # Default role as "user"
        status = "active"  # Assuming default status is active
        created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Prepare the payload for the external API
        payload = {
            "username": username,
            "password": password,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "phone_number": phone_number,
            "address": address,
            "role": role,
            "status": status,
            "created_at": created_at
        }

        # Send POST request to the external API
        try:
            response = requests.post("http://127.0.0.1:3000/api/user/register", json=payload)

            # Print the response for debugging
            print("Response status code:", response.status_code)
            print("Response text:", response.text)

            # Handle the API response
            if response.status_code == 201:  # Assuming 201 Created is returned on success
                # Extract token and user data from the response JSON
                response_data = response.json()
                token = response_data.get("token")
                user_data = response_data.get("user")

                # Store the token and user data in the session
                session["token"] = token
                session["user"] = {
                    "id": user_data["id"],
                    "username": user_data["username"],
                    "email": user_data["email"],
                    "first_name": user_data["first_name"],
                    "last_name": user_data["last_name"],
                    "phone_number": user_data["phone_number"],
                    "address": user_data["address"],
                    "role": user_data["role"]
                }
                send_welcome_email(email, first_name)
                # Redirect to the homepage or wherever appropriate after registration
                return redirect(url_for("homepage"))
            else:
                error_message = response.json().get("message", "Registration failed")
                return render_template("register.html", error=error_message)
        except requests.exceptions.RequestException as e:
            return render_template("register.html", error=f"Error connecting to API: {e}")

    return render_template("register.html")


def send_welcome_email(email, first_name):
    try:
        msg = Message(
            subject="Welcome to Our Platform",
            sender=app.config['MAIL_USERNAME'],
            recipients=[email],
            body=f"Dear {first_name},\n\nWelcome to our platform! We are excited to have you with us.\n\nBest regards,\nThe Team"
        )
        mail.send(msg)
        print("Welcome email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")
        

@app.route("/modelpage", methods=["GET", "POST"])
def index():
    if "user" not in session:
        session['next_url'] = 'modelpage'
        return redirect(url_for("login"))

    result = None
    confidence = None
    error = None
    img_data = None  # To store the base64 image data
    CONFIDENCE_THRESHOLD = 0.60 

    descriptions = {
    'Bacterial_dermatosis': (
        'Bacterial dermatosis refers to skin conditions caused by bacterial infections. These infections can '
        'affect various layers of the skin and may lead to symptoms such as redness, swelling, and pain. '
        'Common examples include impetigo, which is characterized by honey-colored crusts, and cellulitis, '
        'which presents as a red, swollen area that feels warm and tender. Prompt medical attention is often '
        'required to prevent complications and to ensure effective treatment with antibiotics.'
    ),
    'Fungal_infections': (
        'Fungal infections of the skin occur when fungi, such as dermatophytes or yeasts, invade the skin and '
        'multiply. These infections can lead to various symptoms, including itching, redness, and peeling. '
        'Common conditions include ringworm, which causes a ring-shaped rash with a clear center, and athlete’s '
        'foot, which typically affects the spaces between the toes and may cause a scaly, itchy rash. Effective '
        'treatment often involves antifungal medications and maintaining good hygiene to prevent recurrence.'
    ),
    'Healthy': (
        'The term "Healthy" indicates that the skin shows no signs of any dermatological conditions or infections. '
        'The skin appears normal with no visible rashes, lesions, or abnormalities. Maintaining skin health involves '
        'proper skincare practices, including hydration, sun protection, and avoiding irritants or allergens.'
    ),
    'Hypersensitivity_allergic_dermatosis': (
        'Hypersensitivity allergic dermatosis refers to skin conditions triggered by allergic reactions or sensitivities. '
        'These conditions may manifest as hives, eczema, or contact dermatitis, and are characterized by redness, itching, '
        'and swelling. Hives are often raised, itchy welts on the skin, while eczema results in dry, scaly patches. '
        'Identifying and avoiding the allergen or irritant is crucial for managing these conditions, and treatment may '
        'include antihistamines, corticosteroids, and moisturizers to alleviate symptoms and reduce inflammation.'
    )
}


    if request.method == "POST":
        if request.files:
            img_file = request.files.get("file")
            if img_file:
                try:
                    img = Image.open(img_file.stream)

                    # Convert the image to base64 string
                    buffered = BytesIO()
                    img.save(buffered, format="PNG")
                    img_data = base64.b64encode(buffered.getvalue()).decode("utf-8")

                    img_array, error = prepare_image(img)
                    if img_array is None:
                        return render_template("modelpage.html", error=error)

                    pred = model.predict(img_array)
                    pred_label = labels[np.argmax(pred)]
                    confidence = np.max(pred)
                    result = pred_label
                except Exception as e:
                    error = str(e)
        elif request.form.get("image_url"):
            img_url = request.form.get("image_url")
            try:
                response = requests.get(img_url)
                img = Image.open(BytesIO(response.content))

                # Convert the image to base64 string
                buffered = BytesIO()
                img.save(buffered, format="PNG")
                img_data = base64.b64encode(buffered.getvalue()).decode("utf-8")

                img_array, error = prepare_image(img)
                if img_array is None:
                    return render_template("modelpage.html", error=error)

                pred = model.predict(img_array)
                pred_label = labels[np.argmax(pred)]
                confidence = np.max(pred)
                result = pred_label
            except Exception as e:
                error = str(e)
    if confidence is not None and confidence < CONFIDENCE_THRESHOLD:
            result = "Uncertain result, please consult a professional."
            confidence = None    

    description = descriptions.get(result, "No description available.")      

    return render_template("modelpage.html", result=result, confidence=confidence, error=error, img_data=img_data, description=description)


if __name__ == "__main__":
    app.run(debug=True)
