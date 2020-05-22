FROM php:7.2-fpm-alpine

# Copy composer.lock and composer.json
COPY app/composer.* /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apk update &&\
    apk add autoconf\
    g++\
    make \
    zlib-dev \
    libxml2-dev \
    fcgi \
    git \
    bash \
    && docker-php-ext-install zip \
    && docker-php-ext-install mbstring \
    && docker-php-ext-install bcmath \
    && docker-php-ext-install opcache \
    && docker-php-ext-install pdo_mysql

RUN apk --no-cache add postgresql-dev
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

RUN apk del autoconf g++ make


# && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN addgroup -g 1000 -S www && adduser -u 1000 -S www -G www

# Copy existing application directory contents
COPY app/ /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
USER www

# COPY start.sh .
# ENTRYPOINT ["start.sh"]

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
