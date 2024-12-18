def rail_fence_encrypt(plaintext, num_rails):
    rails = [''] * num_rails
    direction = 1
    row = 0

    for char in plaintext:
        rails[row] += char
        if row == 0:
            direction = 1
        elif row == num_rails - 1:
            direction = -1
        row += direction

    return ''.join(rails)

def rail_fence_decrypt(ciphertext, num_rails):
    pattern = [''] * num_rails
    length = len(ciphertext)
    index = 0

    for i in range(num_rails):
        step = 2 * (num_rails - 1)
        for j in range(i, length, step):
            pattern[i] += ciphertext[index]
            index += 1

    result = ''
    row = 0
    direction = 1

    for _ in range(length):
        result += pattern[row][0]
        pattern[row] = pattern[row][1:]
        if row == 0:
            direction = 1
        elif row == num_rails - 1:
            direction = -1
        row += direction

    return result

plaintext = "HELLO WORLD"
num_rails = 2
encrypted = rail_fence_encrypt(plaintext.replace(" ", ""), num_rails)
decrypted = rail_fence_decrypt(encrypted, num_rails)

print("Plaintext:", plaintext)
print("Encrypted:", encrypted)
print("Decrypted:", decrypted)