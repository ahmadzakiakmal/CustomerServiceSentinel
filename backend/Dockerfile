# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory to /backend
WORKDIR /backend

# Install system dependencies
RUN apt-get update && apt-get install -y git

# Install virtualenv
RUN pip install --no-cache-dir virtualenv

# Copy the current directory contents into the container at /backend
COPY . /backend

ENV OPENAI_API_KEY="fill only in vm"
ENV MONGODB_URI="fill only in vm"
ENV JWT_SECRET="fill only in vm"

# Create a virtual environment
RUN virtualenv venv

# Activate the virtual environment and install any needed packages specified in requirements.txt
RUN . venv/bin/activate && pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Set the default command to activate the virtual environment and run the app using Flask
CMD ["sh", "-c", ". venv/bin/activate && flask run --host=0.0.0.0"]

