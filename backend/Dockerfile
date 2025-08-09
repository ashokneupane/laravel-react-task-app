# Use the official PHP 8.2 with Apache base image
FROM php:8.2-apache

# Set the working directory within the container to /var/www/html
WORKDIR /var/www/html

# Copy the composer.json and composer.lock files from the host to the container
COPY composer.json composer.lock /var/www/html/

# Update package lists and install necessary packages
RUN apt-get update && \
    apt-get install -y \
    zip \
    unzip \
    git \
    libpq-dev \
    && docker-php-ext-install \
    pdo_mysql \
    && docker-php-ext-enable \
    pdo_mysql

# Copy Composer binary from another image layer to this image
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Copy all files from the host's current directory to the container's /var/www/html directory
COPY . /var/www/html

# Set an environment variable to allow Composer to run as superuser
ENV COMPOSER_ALLOW_SUPERUSER=1

# Run Composer to install project dependencies, ignoring platform requirements
RUN composer install --ignore-platform-reqs

# Change ownership of certain directories to the www-data user (Apache)
RUN chown -R www-data:www-data /var/www/html/storage \
&& chown -R www-data:www-data /var/www/html/bootstrap/cache

# Enable the Apache rewrite module and update Apache's default site configuration
RUN a2enmod rewrite && \
    sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Expose port 80 for incoming HTTP traffic
EXPOSE 80

# Start the Apache web server in the foreground
CMD ["apache2-foreground"]
