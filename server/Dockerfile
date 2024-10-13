# Use an official Python runtime as the base
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install any dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the project files
COPY . .

# Expose the port the API will run on
EXPOSE 5000

# Run the API server
CMD ["python", "app.py"]
