# -----------------------
# Stage 1: Build dependencies
# -----------------------
FROM python:3.12-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./

# Install Python dependencies into a user directory
RUN pip install --user --no-cache-dir -r requirements.txt


# -----------------------
# Stage 2: Production image
# -----------------------
FROM python:3.12-slim

WORKDIR /app

# Create non-root user
RUN adduser --disabled-password appuser
USER appuser

# Copy installed dependencies
COPY --from=builder /root/.local /home/appuser/.local

# Update PATH
ENV PATH=/home/appuser/.local/bin:$PATH

# Copy app code
COPY --chown=appuser:appuser . .

# Expose app port
EXPOSE 8000

# Environment security settings
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Start using Gunicorn
CMD ["gunicorn", "weshare.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]

