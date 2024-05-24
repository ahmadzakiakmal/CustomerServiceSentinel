# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory to /backend
WORKDIR /backend

# Install Git
RUN apt-get update && apt-get install -y git

# Copy the current directory contents into the container at /backend
COPY . /backend

# Create a virtual environment
RUN virtualenv venv

# Activate the virtual environment and install any needed packages specified in requirements.txt
RUN . venv/bin/activate && pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "app.py"]
